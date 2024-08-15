import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";
import AutoComplete from "../Display/AutoComplete";
import ICD10Autocomplete from "../Codes/ICD10Autocomplete";
import helper from "../Helper";


function PatientCreatePage() {
    const { patient_id } = useParams()
    // const { account } = useContext(AuthContext)

    const [patient, setPatient ] = useState({
        firstName: "",
        lastName: "",
        city: "",
        birthday: "",
        sex: "",
        SSN: "xxx-xx-xxxx",
        DOI: "",
        diagnosisCodes: [],
        carrierID: "",
        carrierName: "",
        representative: null,
        adjuster: null,
        claimNumber: "",
        docLinks: [],
        notes: ""
    });

    const [noPatient, setNoPatient] = useState(false);

    const [representative, setRepresentative] = useState({
        name: "",
        phone: "",
        fax: ""
    })

    const [adjuster, setAdjuster] = useState({
        name: "",
        phone: "",
        fax: "",
        company: ""
    })

    const getPatient = async() =>{
        if (patient_id !== "create") {
            const patientResponse = await fetch(`http://localhost:4000/Patients/${patient_id}`)
            if (patientResponse.ok) {
                const patientData = await patientResponse.json()
                setPatient(patientData)
                setDiagnosisCodes(patientData.diagnosisCodes)
            } else {
                setNoPatient(true)
            }
        } else {
            setNoPatient(true)
        }
    };

    const handlePatientChange = (event) => {
        console.log(patient)
        setPatient({
            ...patient,
            [event.target.name]: event.target.value})
        console.log(diagnosisCodes)
        console.log(selectedCarrier)
    }
    const [diagnosisCodes, setDiagnosisCodes] = useState([])

    const [icdcodes, setICDCodes] = useState([])
    const [icdcount, setICDCount] = useState(0)
    const [showACICD, setShowACICD] = useState(true)
    const [icdSearch, setICDSearch] = useState("")


    // https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=

    // const getICDCodes = async() =>{
    //     const ICDResponse = await fetch("http://localhost:4000/icdcodes/")
    //     // if (ICDResponse.ok) {
    //     //     const ICDData = await ICDResponse.json()
    //     //     setICDCodes(ICDData.sort((a,b) => a.ICDcode.localeCompare(b.ICDcode)))
    //     // }
    // };

    // const filteredCodes = [];
    // const lowerCaseSearch = icdSearch.toLowerCase();

    // for (let i = 0; i < icdcodes.length; i++) {
    //     const icdcode = icdcodes[i];
    //     if (icdSearch &&
    //         (icdcode.ICDcode.toLowerCase().includes(lowerCaseSearch) ||
    //         icdcode.name.toLowerCase().includes(lowerCaseSearch))) {
    //         filteredCodes.push(icdcode);
    //     }
    // }

    const handleSearchICD = async (event) => {
        setShowACICD(true)
        setICDSearch(event.target.value);
        const ICDResponse = await fetch(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${event.target.value}`)
        if (ICDResponse.ok) {
            const ICDData = await ICDResponse.json()
            console.log(ICDData)
            setICDCodes(ICDData[3])
            setICDCount(ICDData[0])
        }
    }

    const handleClickDiagnosis = (item) => {
        setDiagnosisCodes([...diagnosisCodes, {
            code: item[0],
            name: item[1],
        }]);
        setICDSearch("")
    }

    const handleRemoveDiagnosis = (item) => {
        // const newCode = newDiagnosisCodes.filter(newCode => newCode.ICDcode === item.code)
        // if (newCode) {
        //     const codeIndex = newDiagnosisCodes.indexOf(newCode);
        //     const newCodeList = [...newDiagnosisCodes];
        //     newCodeList.splice(codeIndex, 1);
        //     setNewDiagnosisCodes(newCodeList)
        // }
        const diagnosisIndex = diagnosisCodes.indexOf(item);
        const newDiagnosisList = [...diagnosisCodes];
        newDiagnosisList.splice(diagnosisIndex, 1);
        setDiagnosisCodes(newDiagnosisList);
    }

    // const [newDiagnosisCode, setNewDiagnosisCode] = useState({
    //     ICDcode: "",
    //     name: "",
    // })
    // const [newDiagnosisCodes, setNewDiagnosisCodes] = useState([])
    // const handleNewCodeChange = (event) => {
    //     setNewDiagnosisCode({ ...newDiagnosisCode, [event.target.name]: event.target.value});
    // }

    // const addNewCode = (item) => {
    //     setNewDiagnosisCodes([...newDiagnosisCodes, item])
    //     setDiagnosisCodes([...diagnosisCodes, {
    //         code: item.ICDcode,
    //         name: item.name,
    //     }]);
    //     setNewDiagnosisCode({
    //         ICDcode: "",
    //         name: "",
    //     })
    // }

    const [carriers, setCarriers] = useState([])

    const getCarriers = async() =>{
        const carriersResponse = await fetch("http://localhost:4000/carriers/")
        if (carriersResponse.ok) {
            const carriersData = await carriersResponse.json()
            setCarriers(carriersData.sort((a,b) => a.name.localeCompare(b.name)))
            console.log(patient.carrierID)
            const patientCarrier = carriersData.find(carrier => carrier.id === patient.carrierID)
            if (patientCarrier) {
                console.log(patientCarrier)
                setSelectedCarrier(patientCarrier)
            }
        }
    };

    const [selectedCarrier, setSelectedCarrier] = useState("");

    const handleSelectedCarrier = (event) => {
        const carrier_id = event.target.value
        if (carrier_id !== "") {
            const selectedCarrierData = carriers.find(carrier => carrier.id === carrier_id)
            console.log(selectedCarrierData)
            setPatient({
                ...patient,
                ["carrierID"]: selectedCarrierData.id,
                ["carrierName"]: selectedCarrierData.name,
            })
            setSelectedCarrier(selectedCarrierData)
        } else {
            setPatient({
                ...patient,
                ["carrierID"]: "",
                ["carrierName"]: "",
            })
            setSelectedCarrier("")
        }
        console.log(patient)
    }

    useEffect(() => {
        getPatient()
        // getICDCodes()
        getCarriers()
        // document.title = "Patient Create - PM CardBase"
        // return () => {
            //     document.title = "PlayMaker CardBase"
            // };
            // eslint-disable-next-line
    },[]);

    useEffect(() => {
        getCarriers()
        // document.title = "Patient Create - PM CardBase"
        // return () => {
            //     document.title = "PlayMaker CardBase"
            // };
            // eslint-disable-next-line
    },[patient.carrierID]);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...patient};
        delete data._id
        delete data.id
        delete data.__v
        data["representative"] = representative
        data["adjuster"] = adjuster
        data["diagnosisCodes"] = diagnosisCodes
        console.log(data)
        const patientUrl = noPatient? "http://localhost:4000/patients/":
            `http://localhost:4000/patients/${patient_id}`
        const fetchConfig = {
            method: noPatient? "POST": "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(patientUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            const patient_id = responseData._id.toString();
            setPatient({
                firstName: "",
                lastName: "",
                city: "",
                birthday: "",
                sex: "",
                SSN: "xxx-xx-xxxx",
                DOI: "",
                diagnosisCodes: [],
                carrierID: "",
                carrierName: "",
                representative: null,
                adjuster: null,
                claimNumber: "",
                docLinks: [],
                notes: ""
            });
            if (!stayHere) {navigate(`/patients/${patient_id}`)}
            console.log("Success", responseData)
        } else {
            alert("Error in creating patient");
        }
    }

    const [stayHere, setStayHere] = useState(false)
    const handleStayCheck = (event) => {
        setStayHere(!stayHere);
    };

    // if (!(account && account.roles.includes("admin"))) {
    //     setTimeout(function() {
    //         navigate("/")
    //     }, 3000);
    // }

    return (
        <div>
            {/* { account && account.roles.includes("admin")? */}
                <div className="innerContent">
                    <h1 className="margin-top-40">{patient_id === "create"? "Patient Create": "Patient Edit"}</h1>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <div id="create-patient-page">
                                <h5 className="label">First Name </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" First Name"
                                    onChange={handlePatientChange}
                                    name="firstName"
                                    value={patient.firstName}>
                                </input>
                                <br/>
                                <h5 className="label">Last Name </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Last Name"
                                    onChange={handlePatientChange}
                                    name="lastName"
                                    value={patient.lastName}>
                                </input>
                                <br/>
                                <h5 className="label">City </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" City"
                                    onChange={handlePatientChange}
                                    name="city"
                                    value={patient.city}>
                                </input>
                                <br/>
                                <h5 className="label">DOB </h5>
                                <input
                                    className="builder-input"
                                    type="date"
                                    placeholder=" DOB"
                                    max={helper.todaysFormattedDate()}
                                    onChange={handlePatientChange}
                                    name="birthday"
                                    value={patient.birthday}>
                                </input>
                                <br/>
                                <h5 className="label">DOI </h5>
                                <input
                                    className="builder-input"
                                    type="date"
                                    placeholder=" DOI"
                                    max={helper.todaysFormattedDate()}
                                    onChange={handlePatientChange}
                                    name="DOI"
                                    value={patient.DOI}>
                                </input>
                                <br/>
                                <h5 className="label">Sex </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    value={patient.sex}
                                    name="sex"
                                    onChange={handlePatientChange}>
                                    <option value="">Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <br/>
                                <h5 className="label">SSN </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" SSN"
                                    onChange={handlePatientChange}
                                    name="SSN"
                                    value={patient.SSN}>
                                </input>
                                <br/>
                                <h5 className="label">Claim Number </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Claim Number"
                                    onChange={handlePatientChange}
                                    name="claimNumber"
                                    value={patient.claimNumber}>
                                </input>
                                <h5 className="label">Select a Carrier</h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Carrier"
                                    onChange={handleSelectedCarrier}
                                    name="selectedCarrier"
                                    value={selectedCarrier.id}>
                                    <option value="">Carrier</option>
                                    {carriers.map(function(carrier, index)
                                        {return( <option value={carrier.id}
                                            key={index.toString() + carrier.id}
                                            >{carrier.name}</option>)}
                                        )}
                                </select>
                                <br/>
                                {/* <h1>ICD-10 Code Search</h1>
                                <ICD10Autocomplete /> */}
                                <h5 className="label">ICD Code Search {icdSearch? `(${icdcount})`: null}</h5>
                                <AutoComplete
                                    itemList={icdcodes}
                                    renderCondition={showACICD && icdcodes.length > 0}
                                    setNoneRenderFunction={() => setShowACICD(false)}
                                    onChangeFunction={(event) => handleSearchICD(event)}
                                    name={icdSearch}
                                    value={icdSearch}
                                    placeholder={" Diagnosis Code"}
                                    displayContent={(item) => `${item[0]} - ${item[1]}`}
                                    onClickFunction={(item) => handleClickDiagnosis(item)}
                                    size={"360px"}
                                />
                                {diagnosisCodes.length > 0?
                                    <div>
                                        {diagnosisCodes.map(diagnosisCode => {
                                            return (
                                                <h5 onClick={(diagnosisCode) => handleRemoveDiagnosis(diagnosisCode)}>
                                                    {diagnosisCode.code} - {diagnosisCode.name}</h5>
                                            )
                                        })}
                                    </div> :null
                                }
                                <h5 className="label">Notes </h5>
                                <textarea
                                    className="large-patient"
                                    type="text"
                                    placeholder=" Notes"
                                    onChange={handlePatientChange}
                                    name="notes"
                                    value={patient.notes}>
                                </textarea>
                                <br/>
                                <div className="flex builder-input">
                                    <div className="flex-full margin-left">
                                        <input
                                            style={{margin: "2px 5px 0 0", height:"10px"}}
                                            id="stayHere"
                                            type="checkbox"
                                            onChange={handleStayCheck}
                                            name="stayHere"
                                            checked={stayHere}
                                            >
                                        </input>
                                        <label for="stayHere"
                                            className="bold"
                                        >
                                            Keep me here
                                        </label>
                                    </div>
                                </div>
                                {/* {account? */}
                                    <div className="flex-items">
                                        <button
                                            className="left"
                                            onClick={handleSubmit}
                                        >
                                            {noPatient? "Create Patient": "Edit Patient"}
                                        </button>
                                        {/* <button
                                            className="left"
                                            onClick={() => handleAddImage()}
                                        >
                                            Add Image
                                        </button> */}
                                    </div>
                                {/* :null} */}
                                <br/>
                                {/* { !account?
                                    <h6 className="error">You must be logged in to create an patient</h6>:
                                null
                                } */}
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* : */}
                {/* <div className="textwindow">
                    <h1 className="undercontext">This Feature Is For Admins Only</h1>
                    <h3 className="undercontext">Redirecting in 3 Seconds</h3>
                </div>
            } */}
        </div>
    );
}

export default PatientCreatePage;
