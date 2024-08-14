import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';


function BillPage() {

    const { bill_id } = useParams()

    const [bill, setBill ] = useState({
        patientFirstName: "",
        patientLastName: "",
        diagnosisCodes: [],
        carrierID: "",
        carrierName: "",
        claimNumber: "",
        procedureCodes: [],
        disputedAreas: [],
        DOS: "",
        charge: 0,
        status: "",
        sent: "",
        received: "",
        processed: "",
        paid: 0,
        docLink: "",
        notes: "",
        lastChecked: "",
    });

    const [noBill, setNoBill] = useState(false);

    const getBill = async() =>{
        const billResponse = await fetch(`http://localhost:4000/bills/${bill_id}`)
        if (billResponse.ok) {
            const billData = await billResponse.json()
            setBill(billData);
            console.log(billData)
        } else {
            setNoBill(true)
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0);
        getBill();

    // eslint-disable-next-line
    },[]);

    return (
        <div className="innerContent">
            <h1 className="left-h1">{bill.patientLastName}, {bill.patientFirstName}</h1>
            <div>
                <h5 style={{fontWeight: "600", margin: "12px"}}>Claim Number: {bill.claimNumber}</h5>
                <h5 style={{fontWeight: "600", margin: "12px"}}>Carrier: {bill.carrierName}</h5>
                {/* <h5 style={{fontWeight: "600", margin: "12px"}}>{bill.carrierName}</h5> */}
                {/* <h5 style={{fontWeight: "600", margin: "12px"}}>DOB: {bill.birthday}</h5> */}
                {/* <h5 style={{fontWeight: "600", margin: "12px"}}>DOI: {bill.DOI}</h5> */}
                {/* <h5 style={{fontWeight: "600", margin: "12px"}}>Representative: {bill.representative}</h5> */}
                <h5 style={{fontWeight: "600", margin: "12px"}}>Diagnosis Codes</h5>
                {bill.diagnosisCodes?.map(diagnosisCode => {
                    return (
                        <h5 style={{fontWeight: "600", margin: "12px"}}>{diagnosisCode.code} - {diagnosisCode.name}</h5>
                    )
                })}
                <h5 style={{fontWeight: "600", margin: "12px"}}>Procedure Codes</h5>
                {bill.procedureCodes?.map(procedureCode => {
                    return (
                        <h5 style={{fontWeight: "600", margin: "12px"}}>{procedureCode.code} - {procedureCode.name}</h5>
                    )
                })}
            </div>
            <NavLink to={`/billcreate/${bill_id}`}>
                <button>Edit</button>
            </NavLink>
        </div>
    );
}

export default BillPage;
