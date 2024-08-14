import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/AuthContext";
import helper from "../Helper";


function CarrierCreatePage() {

    // const { account } = useContext(AuthContext)

    const [carrier, setCarrier ] = useState({
        name: "",
        address: "",
        phone: [],
        fax: "",
        email: "",
        notes: "",
    });

    const [carrierNames, setCarrierNames] = useState([])

    const [stayHere, setStayHere] = useState(false)

    const getCarriers = async() =>{
        // const CarriersResponse = await fetch("https://pm-deck-react-only.onrender.com/Carriers")
        const carriersResponse = await fetch("http://localhost:4000/carriers/")
        const carriersData = await carriersResponse.json()
        if (carriersData.length > 0 ) {
            console.log(carriersData)
            setCarrierNames(carriersData.map(carrier => carrier.name));
        }
    };

    const handleCarrierChange = (event) => {
        console.log(carrier)
        setCarrier({
            ...carrier,
            [event.target.name]: event.target.value})
    }

    const handleStayCheck = (event) => {
        setStayHere(!stayHere);
    };

    useEffect(() => {
        getCarriers()
        // document.title = "Carrier Create - PM CardBase"
        // return () => {
        //     document.title = "PlayMaker CardBase"
        // };
    // eslint-disable-next-line
    },[]);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...carrier};
        console.log(data)
        if (carrierNames.includes(data.name)) {
            data["name"] = `${carrier.name} ${helper.generateRandomString(5)}`
        }
        // const carrierUrl = "https://pm-deck-react-only.onrender.com/carriers/";
        const carrierUrl = "http://localhost:4000/carriers/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(carrierUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            const carrier_id = responseData._id.toString();
            setCarrier({
                name: "",
                address: "",
                phone: [],
                fax: "",
                email: "",
                notes: "",
            });
            // if (!stayHere) {navigate(`/carriers/${carrier_id}`)}
            console.log("Success", responseData)
        } else {
            alert("Error in creating carrier");
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
                    <h1 className="margin-top-40">Carrier Create</h1>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <div id="create-carrier-page">
                                <h5 className="label">Name </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Name"
                                    onChange={handleCarrierChange}
                                    name="name"
                                    value={carrier.name}>
                                </input>
                                <br/>
                                <h5 className="label">Address </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Address"
                                    onChange={handleCarrierChange}
                                    name="address"
                                    value={carrier.address}>
                                </input>
                                <br/>
                                {/* <h5 className="label">City </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Phone Number"
                                    onChange={handleCarrierChange}
                                    name="city"
                                    value={carrier.phone}>
                                </input>
                                <br/> */}
                                <h5 className="label">Fax </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Fax Number"
                                    onChange={handleCarrierChange}
                                    name="fax"
                                    value={carrier.fax}>
                                </input>
                                <br/>
                                <h5 className="label">Email </h5>
                                <input
                                    className="builder-input"
                                    type="text"
                                    placeholder=" Claim Number"
                                    onChange={handleCarrierChange}
                                    name="email"
                                    value={carrier.email}>
                                </input>
                                <h5 className="label">Notes </h5>
                                <textarea
                                    className="large-carrier"
                                    type="text"
                                    placeholder=" Notes"
                                    onChange={handleCarrierChange}
                                    name="notes"
                                    value={carrier.notes}>
                                </textarea>
                                <br/>
                                <div className="flex builder-input">
                                    {/* <div className="flex-full">
                                        <input
                                            style={{margin: "2px 5px 0 0", height:"10px"}}
                                            type="checkbox"
                                            onChange={handleCarrierCheck}
                                            name="news"
                                            checked={carrier.news}
                                            >
                                        </input>
                                        <label for="news"
                                            className="bold"
                                        >
                                            News Carrier
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
                                            Create Carrier
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
                                    <h6 className="error">You must be logged in to create an carrier</h6>:
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

export default CarrierCreatePage;
