import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";
import AutoComplete from "../Display/AutoComplete";
import helper from "../Helper";


function BillCreatePage() {
    const { bill_id } = useParams()
    // const { account } = useContext(AuthContext)

    const [bill, setBill] = useState({
        patientFirstName: "",
        patientLastName: "",
        diagnosisCodes: [],
        carrierID: "",
        carrierName: "",
        claimNumber: "",
        procedureCodes: [],
        DOS: helper.todaysFormattedDate(),
        charge: 0,
        status: "",
        sent: helper.todaysFormattedDate(),
        received: "",
        paid: "",
        lastChecked: "",
        docLink: "",
        notes: ""
    });

    const [noBill, setNoBill] = useState(false)

    const getBill = async() =>{
        if (bill_id !== "create") {
            const billResponse = await fetch(`http://localhost:4000/bills/${bill_id}`)
            if (billResponse.ok) {
                const billData = await billResponse.json()
                setBill(billData);
                console.log(billData.diagnosisCodes)
                setDiagnosisCodes(billData.diagnosisCodes)
            } else {
                setNoBill(true)
            }
        } else {
            setNoBill(true)
        }
    };

    const handleBillChange = (event) => {
        console.log(diagnosisCodes)
        setBill({
            ...bill,
            [event.target.name]: event.target.value})
    }

    const handleStayCheck = (event) => {
        setStayHere(!stayHere);
    };

    const [patients, setPatients] = useState([]);
    const [noPatients, setNoPatients] = useState(false);

    const getPatients = async() =>{
        // const PatientsResponse = await fetch("https://pm-deck-react-only.onrender.com/Patients")
        const patientsResponse = await fetch("http://localhost:4000/Patients/")
        const patientsData = await patientsResponse.json()
        if (patientsData.length == 0 ) {
            setNoPatients(true)
        } else {
            // const sortedPatients = [...PatientsData].sort(sortMethods[sortState].method);
            setPatients(patientsData);
        }
    };

    const [selectedPatient, setSelectedPatient] = useState("");

    const handleSelectedPatient = (event) => {
        const claimNumber = event.target.value
        if (claimNumber !== "") {
            const selectedPatientData = patients.find(patient => patient.claimNumber === claimNumber)
            console.log(selectedPatientData.diagnosisCodes)
            setBill({
                ...bill,
                ["patientFirstName"]: selectedPatientData.firstName,
                ["patientLastName"]: selectedPatientData.lastName,
                ["carrierID"]: selectedPatientData.carrierID,
                ["carrierName"]: selectedPatientData.carrierName,
                ["claimNumber"]: selectedPatientData.claimNumber,
            })
            setSelectedPatient(selectedPatientData)
            setDiagnosisCodes(selectedPatientData.diagnosisCodes)
        } else {
            setBill({
                ...bill,
                ["patientFirstName"]: "",
                ["patientLastName"]: "",
                ["carrierID"]: "",
                ["carrierName"]: "",
                ["claimNumber"]: "",
            })
            setSelectedPatient("")
        }
        console.log(bill)
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

    const [stayHere, setStayHere] = useState(false)

    useEffect(() => {
        getPatients()
        getBill()
        getICDCodes()
        // document.title = "Bill Create - PM CardBase"
        // return () => {
        //     document.title = "PlayMaker CardBase"
        // };
    // eslint-disable-next-line
    },[]);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...bill};
        delete data._id
        delete data.__v
        data["diagnosisCodes"] = diagnosisCodes
        if (data["status"] === "Pending") {
            data["paid"] = null
        } else if (data["status"] === "Denied") {
            data["paid"] = null
        } else if (data["status"] === "") {
            data["received"] = null
            data["paid"] = null
        }
        console.log(data)
        const billUrl = noBill? "http://localhost:4000/bills/":
            `http://localhost:4000/bills/${bill_id}`
        const fetchConfig = {
            method: noBill? "POST": "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(billUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            const bill_id = responseData._id.toString();
            setBill({
                patientFirstName: "",
                patientLastName: "",
                diagnosisCodes: [],
                carrierID: "",
                carrierName: "",
                claimNumber: "",
                procedureCodes: [],
                DOS: helper.todaysFormattedDate(),
                charge: 0,
                status: "",
                sent: "",
                received: "",
                paid: "",
                docLink: "",
                notes: ""
            });
            // if (!stayHere) {navigate(`/bills/${bill_id}`)}
            console.log("Success", responseData)
        } else {
            alert("Error in creating bill");
        }
    }

    // if (!(account && account.roles.includes("admin"))) {
    //     setTimeout(function() {
    //         navigate("/")
    //     }, 3000);
    // }

    return (
        <div>
            {/* { account && account.roles.includes("admin")? */}
                <div className="innerContent">
                <h1 className="margin-top-40">{bill_id === "create"? "Bill Create": "Bill Edit"}</h1>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <div id="create-bill-page">
                                <h5 className="label">Select a Patient</h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Patient"
                                    onChange={handleSelectedPatient}
                                    name="selectedPatient"
                                    value={selectedPatient.claimNumber}>
                                    <option value="">Patient</option>
                                    {patients.map(function(patient, index)
                                        {return( <option value={patient.claimNumber}
                                            key={index.toString() + patient.claimNumber}
                                            >{patient.lastName}, {patient.firstName}</option>)}
                                        )}
                                </select>
                                <br/>
                                {selectedPatient?
                                    <>
                                        <h5 className="label">{bill.patientFirstName}</h5>
                                        <h5 className="label">{bill.patientLastName}</h5>
                                        <h5 className="label">{bill.claimNumber}</h5>
                                        <h5 className="label">{bill.carrierName}</h5>
                                    </>
                                : null}
                                {diagnosisCodes?.map(code => {
                                    return (
                                        <h5 className="label">{code.code}: {code.name}</h5>
                                    );
                                })}
                                <h5 className="label">First Name </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" First Name"
                                    onChange={handleBillChange}
                                    name="patientFirstName"
                                    value={bill.patientFirstName}>
                                </input>
                                <br/>
                                <h5 className="label">Last Name </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Last Name"
                                    onChange={handleBillChange}
                                    name="patientLastName"
                                    value={bill.patientLastName}>
                                </input>
                                <br/>
                                <h5 className="label">Claim Number </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Claim Number"
                                    onChange={handleBillChange}
                                    name="claimNumber"
                                    value={bill.claimNumber}>
                                </input>
                                <br/>
                                <h5 className="label">DOS </h5>
                                <input
                                    className="builder-input"
                                    type="date"
                                    placeholder=" DOS"
                                    max={helper.todaysFormattedDate()}
                                    onChange={handleBillChange}
                                    name="DOS"
                                    value={bill.DOS}>
                                </input>
                                <br/>
                                <h5 className="label">Charge </h5>
                                <input
                                    className="builder-input"
                                    type="number"
                                    placeholder=" Charge"
                                    onChange={handleBillChange}
                                    name="charge"
                                    value={bill.charge}>
                                </input>
                                <br/>
                                <h5 className="label">Status </h5>
                                <select
                                    className="builder-input"
                                    type="text"
                                    value={bill.status}
                                    name="status"
                                    onChange={handleBillChange}>
                                    <option value="">Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Denied">Denied</option>
                                </select>
                                <br/>
                                <h5 className="label">Date Sent </h5>
                                <input
                                    className="builder-input"
                                    type="date"
                                    placeholder=" Date Sent"
                                    max={helper.todaysFormattedDate()}
                                    onChange={handleBillChange}
                                    name="sent"
                                    value={bill.sent}>
                                </input>
                                <br/>
                                {["Pending", "Paid", "Denied"].includes(bill.status)?
                                    <>
                                        <h5 className="label">Date Received </h5>
                                        <input
                                            className="builder-input"
                                            type="date"
                                            placeholder=" Date Received"
                                            max={helper.todaysFormattedDate()}
                                            onChange={handleBillChange}
                                            name="received"
                                            value={bill.received}>
                                        </input>
                                        <br/>
                                    </>
                                :null}
                                {bill.status === "Paid"?
                                    <>
                                        <h5 className="label">Amount Paid </h5>
                                        <input
                                            className="builder-input"
                                            type="number"
                                            placeholder=" Amount Paid"
                                            onChange={handleBillChange}
                                            name="paid"
                                            value={bill.charge}>
                                        </input>
                                        <br/>
                                    </>
                                :null}
                                <h5 className="label">GoogleDocs Link </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Link"
                                    onChange={handleBillChange}
                                    name="docLink"
                                    value={bill.docLink}>
                                </input>
                                <br/>
                                <h5 className="label">Notes </h5>
                                <textarea
                                    className="large-bill"
                                    type="text"
                                    placeholder=" Notes"
                                    onChange={handleBillChange}
                                    name="notes"
                                    value={bill.notes}>
                                </textarea>
                                <br/>
                                <div className="flex builder-input">
                                    {/* <div className="flex-full">
                                        <input
                                            style={{margin: "2px 5px 0 0", height:"10px"}}
                                            type="checkbox"
                                            onChange={handleBillCheck}
                                            name="news"
                                            checked={bill.news}
                                            >
                                        </input>
                                        <label for="news"
                                            className="bold"
                                        >
                                            News Bill
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
                                            Create Bill
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
                                    <h6 className="error">You must be logged in to create an bill</h6>:
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

export default BillCreatePage;
