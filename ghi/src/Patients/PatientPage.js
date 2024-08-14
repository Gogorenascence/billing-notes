import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';


function PatientPage() {

    const { patient_id } = useParams()

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

    const getPatient = async() =>{
        const patientResponse = await fetch(`http://localhost:4000/Patients/${patient_id}`)
        if (patientResponse.ok) {
            const patientData = await patientResponse.json()
            setPatient(patientData);
        } else {
            setNoPatient(true)
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0);
        getPatient();
    // eslint-disable-next-line
    },[]);

    return (
        <div className="innerContent">
            <h1 className="left-h1">{patient.lastName}, {patient.firstName} ({patient.sex[0]})</h1>
            <div>
                <h5 style={{fontWeight: "600", margin: "12px"}}>{patient.city}</h5>
                <h5 style={{fontWeight: "600", margin: "12px"}}>DOB: {patient.birthday}</h5>
                <h5 style={{fontWeight: "600", margin: "12px"}}>DOI: {patient.DOI}</h5>
                <h5 style={{fontWeight: "600", margin: "12px"}}>Carrier: {patient.carrierName}</h5>
                <h5 style={{fontWeight: "600", margin: "12px"}}>Claim Number: {patient.claimNumber}</h5>
                {/* <h5 style={{fontWeight: "600", margin: "12px"}}>Representative: {patient.representative}</h5> */}
                <h5 style={{fontWeight: "600", margin: "12px"}}>Diagnosis Codes</h5>
                {patient.diagnosisCodes?.map(diagnosisCode => {
                    return (
                        <h5 style={{fontWeight: "600", margin: "12px"}}>{diagnosisCode.code} - {diagnosisCode.name}</h5>
                    )
                })}
            </div>
            <NavLink to={`/patientcreate/${patient_id}`}>
                <button>Edit</button>
            </NavLink>
        </div>
    );
}

export default PatientPage;
