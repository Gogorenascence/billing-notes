import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";
import AutoComplete from "../Display/AutoComplete";
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
                setPatient(patientData);
            } else {
                setNoPatient(true)
            }
        }
    };

    const handlePatientChange = (event) => {
        console.log(patient)
        setPatient({
            ...patient,
            [event.target.name]: event.target.value})
            console.log(diagnosisCodes)
        }
    const [diagnosisCodes, setDiagnosisCodes] = useState([])

    const [icdcodes, setICDCodes] = useState([])
    const [showACICD, setShowACICD] = useState(true)
    const [icdSearch, setICDSearch] = useState("")

    const getICDCodes = async() =>{
        const ICDResponse = await fetch("http://localhost:4000/icdcodes/")
        if (ICDResponse.ok) {
            const ICDData = await ICDResponse.json()
            setICDCodes(ICDData.sort((a,b) => a.ICDcode.localeCompare(b.ICDcode)))
        }
    };

    const filteredCodes = [...icdcodes].filter(icdcode =>
        icdSearch? (icdcode.ICDcode.toLowerCase().includes(icdSearch.toLowerCase()) ||
        icdcode.name.toLowerCase().includes(icdSearch)): false)


    const handleSearchICD = (event) => {
        setShowACICD(true)
        setICDSearch(event.target.value);
    }


    const handleClickDiagnosis = (item) => {
        setDiagnosisCodes([...diagnosisCodes, {
            code: item.ICDcode,
            name: item.name,
        }]);
        setICDSearch("")
    }

    const handleRemoveDiagnosis = (item) => {
        const diagnosisIndex = diagnosisCodes.indexOf(item);
        const newDiagnosisList = [...diagnosisCodes];
        newDiagnosisList.splice(diagnosisIndex, 1);
        setDiagnosisCodes(newDiagnosisList);
    }

    useEffect(() => {
        getPatient()
        getICDCodes()
        // document.title = "Patient Create - PM CardBase"
        // return () => {
            //     document.title = "PlayMaker CardBase"
            // };
            // eslint-disable-next-line
        },[]);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...patient};
        delete data._id
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
            // const patient_id = responseData._id.toString();
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
            // if (!stayHere) {navigate(`/patients/${patient_id}`)}
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
                                <h5 className="label">ICD Code Search {icdSearch? `(${filteredCodes.length})`: null}</h5>
                                <AutoComplete
                                    itemList={filteredCodes}
                                    renderCondition={showACICD && filteredCodes.length > 0}
                                    setNoneRenderFunction={() => setShowACICD(false)}
                                    onChangeFunction={(event) => handleSearchICD(event)}
                                    name={icdSearch}
                                    value={icdSearch}
                                    placeholder={" Diagnosis Code"}
                                    displayContent={"name"}
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
                                    {/* <div className="flex-full">
                                        <input
                                            style={{margin: "2px 5px 0 0", height:"10px"}}
                                            type="checkbox"
                                            onChange={handlePatientCheck}
                                            name="news"
                                            checked={patient.news}
                                            >
                                        </input>
                                        <label for="news"
                                            className="bold"
                                        >
                                            News Patient
                                        </label>
                                    </div> */}
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
