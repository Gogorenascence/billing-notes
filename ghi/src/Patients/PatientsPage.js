import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';


function PatientsPage() {

    const [patients, setPatients] = useState([]);

    // const {
    //     query,
    //     setQuery,
    //     sortState,
    //     setSortState,
    //     boosterSet,
    //     setBoosterSet,
    //     boosterSetId,
    //     setBoosterSetId,
    //     rarity,
    //     setRarity
    // } = useContext(QueryContext);

    // const [listView, setListView] = useState(false);
    const [showMore, setShowMore] = useState(20);

    const [noPatients, setNoPatients] = useState(false);

    const getPatients = async() =>{
        // const PatientsResponse = await fetch("https://pm-deck-react-only.onrender.com/Patients")
        const patientsResponse = await fetch("http://localhost:4000/Patients/")
        const patientsData = await patientsResponse.json()
        if (patientsData.length == 0 ) {
            setNoPatients(true)
        } else {
            // const sortedPatients = [...PatientsData].sort(sortMethods[sortState].method);
            console.log(patientsData)
            setPatients(patientsData);
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0);
        getPatients();
        console.log(patients)
        // document.title = "Patients - PM PatientBase"
        // return () => {
        //     document.title = "PlayMaker PatientBase"
        // };
    // eslint-disable-next-line
    },[]);

    // const sortMethods = {
    //     none: { method: (a,b) => new Date(b.updated_on?.full_time) - new Date(a.updated_on?.full_time) },
    //     newest: { method: (a,b) => b.id.localeCompare(a.id) },
    //     oldest: { method: (a,b) => a.id.localeCompare(b.id) },
    //     name: { method: (a,b) => a.name.localeCompare(b.name) },
    //     Patient_number: { method: (a,b) => a.Patient_number - b.Patient_number },
    //     enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
    //     enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    // };

    // const handleQuery = (event) => {
    //     setQuery({ ...query, [event.target.name]: event.target.value });
    //     setShowMore(20)
    //     console.log(Patients)
    //     console.log(query)
    // };

    // const handleQueryReset = (event) => {
    //     setQuery({
    //         PatientName: "",
    //         PatientText: "",
    //         PatientNumber: "",
    //         heroID: "",
    //         series: "",
    //         startingNum: "",
    //         type: "",
    //         PatientClass: "",
    //         extraEffect: "",
    //         reaction: "",
    //         tag: "",
    //     });
    //     setShowMore(20)
    //     setSortState("none")
    //     setBoosterSetId("")
    //     setBoosterSet("");
    //     setRarity("")
    // };

    // const handleSort = (event) => {
    //     setSortState(event.target.value);
    // };

    // const handleShowMore = (event) => {
    //     setShowMore(showMore + 20);
    // };

    // const handleListView = (event) => {
    //     setListView(!listView);
    //     setShowMore(20)
    // };

    const allPatients = patients
    // const all_Patients = Patients.filter(Patient => Patient.name.toLowerCase().includes(query.PatientName.toLowerCase()))
    //     .filter((Patient, index, arr) => (Patient.effect_text + Patient.second_effect_text).toLowerCase().includes(query.PatientText.toLowerCase()))
    //     .filter(Patient => Patient.Patient_number.toString().includes(query.PatientNumber))
    //     .filter(Patient => Patient.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    //     .filter((Patient, index, arr) => Patient.series_name.toLowerCase().includes(query.series.toLowerCase()))
    //     .filter(Patient => Patient.Patient_number > query.startingNum - 1)
    //     .filter(Patient => query.type? Patient.Patient_type.some(type => type.toString() == query.type):Patient.Patient_type)
    //     .filter(Patient => Patient.Patient_class.includes(query.PatientClass))
    //     .filter(Patient => query.extraEffect? Patient.extra_effects.some(effect => effect.toString() == query.extraEffect):Patient.extra_effects)
    //     .filter(Patient => query.reaction? Patient.reactions.some(reaction => reaction.toString() == query.reaction):Patient.reactions)
    //     .filter(Patient => query.tag? Patient.Patient_tags.some(tag => tag.toString() == query.tag):Patient.Patient_tags)
    //     .filter(Patient => boosterSet && !rarity ? boosterSet.all_Patients.includes(Patient.Patient_number):Patient.Patient_number)
    //     .filter(Patient => boosterSet && rarity ? boosterSet[rarity].includes(Patient.Patient_number):Patient.Patient_number)
    //     .sort(sortMethods[sortState].method)

        // const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="innerContent">
            <h1 className="left-h1">Patient List</h1>
            <NavLink to="/patientcreate/create">
                <button>Create</button>
            </NavLink>

            {/* <h2 className="left">Search our collection of Patients</h2> */}
            {/* <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Patient Name Contains..."
                name="PatientName"
                value={query.PatientName}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Patient Text Contains..."
                name="PatientText"
                value={query.PatientText}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left dcbsearch-x-large dcbsearch-switch"
                type="text"
                placeholder=" Patient Set"
                onChange={handleBoosterSetChange}
                name="boosterSet"
                value={boosterSetId}>
                <option value="">Patient Set</option>
                {booster_sets.map(function(boosterSet)
                {return( <option value={boosterSet.id}>{boosterSet.name}</option>)}
                    )}
            </select>
            <select
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Rarity"
                onChange={handleRarityChange}
                name="rarity"
                value={rarity}>
                <option value="">Rarity</option>
                <option value="mv">Max Variables</option>
                <option value="normals">Normals</option>
                <option value="rares">Rares</option>
                <option value="super_rares">Super Rares</option>
                <option value="ultra_rares">Ultra Rares</option>
            </select>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Patient Number"
                style={{width: "177px", height: "37px"}}
                name="PatientNumber"
                value={query.PatientNumber}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="number"
                placeholder=" Starting Number"
                style={{width: "177px", height: "37px"}}
                name="startingNum"
                value={query.startingNum}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Hero ID"
                style={{width: "177px", height: "37px"}}
                name="heroID"
                value={query.heroID}
                onChange={handleQuery}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Series"
                style={{width: "177px", height: "37px"}}
                name="series"
                value={query.series}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder=" Type"
                style={{width: "115px", height: "37px"}}
                name="type"
                value={query.type}
                onChange={handleQuery}>
                <option value="">Type</option>
                <option value="1001">Fighter</option>
                <option value="1002">Aura</option>
                <option value="1003">Move</option>
                <option value="1004">Ending</option>
                <option value="1005">Any Type</option>
                <option value="1006">Item</option>
                <option value="1007">Event</option>
                <option value="1008">Comeback</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "115px", height: "37px"}}
                name="PatientClass"
                value={query.PatientClass}
                onChange={handleQuery}>
                <option value="">Class</option>
                <option value="Staunch">Staunch</option>
                <option value="Power">Power</option>
                <option value="Unity">Unity</option>
                <option value="Canny">Canny</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Extra Effect"
                style={{width: "115px", height: "37px"}}
                name="extraEffect"
                value={query.extraEffect}
                onChange={handleQuery}>
                <option value="">Extra Effect</option>
                <option value="1001">Trigger</option>
                <option value="1003">Limited</option>
                <option value="1002">Critical</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Reaction"
                style={{width: "115px", height: "37px"}}
                name="reaction"
                value={query.reaction}
                onChange={handleQuery}>
                <option value="">Reaction</option>
                <option value="1001">Block</option>
                <option value="1002">Counter</option>
                <option value="1003">Endure</option>
                <option value="1004">Redirect</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Tag"
                style={{width: "115px", height: "37px"}}
                name="tag"
                value={query.tag}
                onChange={handleQuery}>
                <option value="">Tag</option>
                <option value="1001">5 HP</option>
                <option value="1002">Focus</option>
                <option value="1003">Auto</option>
                <option value="1004">Stay</option>
                <option value="1005">Max</option>
                <option value="1006">Cycle</option>
                <option value="1007">Hit 1</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Sorted By"
                style={{width: "115px", height: "37px"}}
                value={sortState}
                onChange={handleSort}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name">A-Z</option>
                <option value="Patient_number">Patient Number</option>
                <option value="enthusiasm_highest">Enth (High)</option>
                <option value="enthusiasm_lowest">Enth (Low)</option>
            </select>
            <br/>

            <button
                className="left"
                variant="dark"
                onClick={handleQueryReset}
                >
                Reset Filters
            </button>
            <button
                className="left"
                onClick={getRandomPatient}
                >
                Random Patient
            </button>
            {listView?
                <button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    Image View
                </button>:
                <button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    List View
                </button>} */}

                {/* { all_Patients.length == 0 && isQueryEmpty && !noPatients?
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div> :
                null} */}

            {/* <h4 className="left-h3">Showing Results 1 - {all_Patients.slice(0, showMore).length} of {all_Patients.length}</h4> */}
            {/* <h4 className="left-h3">
                    {all_Patients.length > 0 ? `Showing Results 1 - ${all_Patients.slice(0, showMore).length} of ${all_Patients.length}`:
                        "No Patient Fits Your Search Criteria"}
                </h4> */}

            {allPatients.length > 0?
                <div className="Patient-list2">
                    {allPatients.slice(0, showMore).map(function(patient, index, arr) {
                        return (
                            <NavLink to={`/patients/${patient.id}`} className="nav-link glow2" key={`${patient.DWCNumber} ${index}`}>
                                <div className={1 ? `big${patient.patient_class}5` : "bigNoClass2"}>
                                    <h3 style={{fontWeight: "600", margin: "12px"}}>{patient.lastName}, {patient.firstName}</h3>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{patient.city}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>DOB: {patient.birthday}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>DOI: {patient.DOI}</h5>
                                    {/* <h5 style={{fontWeight: "600", margin: "12px"}}>{patient.carrierName}</h5> */}
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{patient.claimNumber}</h5>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>: null
            }
            {/* {showMore < all_patients.length ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"3%"}}
                    onClick={handleShowMore}>
                    Show More patients ({all_patients.length - showMore} Remaining)
                </button>:
                null
            } */}
        </div>
    );
}

export default PatientsPage;
