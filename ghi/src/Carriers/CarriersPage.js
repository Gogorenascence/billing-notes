import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';


function CarriersPage() {

    const [carriers, setCarriers] = useState([]);

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

    const [noCarriers, setNoCarriers] = useState(false);

    const getCarriers = async() =>{
        // const CarriersResponse = await fetch("https://pm-deck-react-only.onrender.com/Carriers")
        const carriersResponse = await fetch("http://localhost:4000/Carriers/")
        const carriersData = await carriersResponse.json()
        if (carriersData.length == 0 ) {
            setNoCarriers(true)
        } else {
            // const sortedCarriers = [...CarriersData].sort(sortMethods[sortState].method);
            console.log(carriersData)
            setCarriers(carriersData);
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0);
        getCarriers();
        console.log(carriers)
        // document.title = "Carriers - PM CarrierBase"
        // return () => {
        //     document.title = "PlayMaker CarrierBase"
        // };
    // eslint-disable-next-line
    },[]);

    // const sortMethods = {
    //     none: { method: (a,b) => new Date(b.updated_on?.full_time) - new Date(a.updated_on?.full_time) },
    //     newest: { method: (a,b) => b.id.localeCompare(a.id) },
    //     oldest: { method: (a,b) => a.id.localeCompare(b.id) },
    //     name: { method: (a,b) => a.name.localeCompare(b.name) },
    //     Carrier_number: { method: (a,b) => a.Carrier_number - b.Carrier_number },
    //     enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
    //     enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    // };

    // const handleQuery = (event) => {
    //     setQuery({ ...query, [event.target.name]: event.target.value });
    //     setShowMore(20)
    //     console.log(Carriers)
    //     console.log(query)
    // };

    // const handleQueryReset = (event) => {
    //     setQuery({
    //         CarrierName: "",
    //         CarrierText: "",
    //         CarrierNumber: "",
    //         heroID: "",
    //         series: "",
    //         startingNum: "",
    //         type: "",
    //         CarrierClass: "",
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

    const allCarriers = carriers
    // const all_Carriers = Carriers.filter(Carrier => Carrier.name.toLowerCase().includes(query.CarrierName.toLowerCase()))
    //     .filter((Carrier, index, arr) => (Carrier.effect_text + Carrier.second_effect_text).toLowerCase().includes(query.CarrierText.toLowerCase()))
    //     .filter(Carrier => Carrier.Carrier_number.toString().includes(query.CarrierNumber))
    //     .filter(Carrier => Carrier.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    //     .filter((Carrier, index, arr) => Carrier.series_name.toLowerCase().includes(query.series.toLowerCase()))
    //     .filter(Carrier => Carrier.Carrier_number > query.startingNum - 1)
    //     .filter(Carrier => query.type? Carrier.Carrier_type.some(type => type.toString() == query.type):Carrier.Carrier_type)
    //     .filter(Carrier => Carrier.Carrier_class.includes(query.CarrierClass))
    //     .filter(Carrier => query.extraEffect? Carrier.extra_effects.some(effect => effect.toString() == query.extraEffect):Carrier.extra_effects)
    //     .filter(Carrier => query.reaction? Carrier.reactions.some(reaction => reaction.toString() == query.reaction):Carrier.reactions)
    //     .filter(Carrier => query.tag? Carrier.Carrier_tags.some(tag => tag.toString() == query.tag):Carrier.Carrier_tags)
    //     .filter(Carrier => boosterSet && !rarity ? boosterSet.all_Carriers.includes(Carrier.Carrier_number):Carrier.Carrier_number)
    //     .filter(Carrier => boosterSet && rarity ? boosterSet[rarity].includes(Carrier.Carrier_number):Carrier.Carrier_number)
    //     .sort(sortMethods[sortState].method)

        // const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="innerContent">
            <h1 className="left-h1">Carrier List</h1>
            <NavLink to="/carriercreate">
                <button>Create</button>
            </NavLink>

            {/* <h2 className="left">Search our collection of Carriers</h2> */}
            {/* <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Carrier Name Contains..."
                name="CarrierName"
                value={query.CarrierName}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Carrier Text Contains..."
                name="CarrierText"
                value={query.CarrierText}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left dcbsearch-x-large dcbsearch-switch"
                type="text"
                placeholder=" Carrier Set"
                onChange={handleBoosterSetChange}
                name="boosterSet"
                value={boosterSetId}>
                <option value="">Carrier Set</option>
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
                placeholder=" Carrier Number"
                style={{width: "177px", height: "37px"}}
                name="CarrierNumber"
                value={query.CarrierNumber}
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
                name="CarrierClass"
                value={query.CarrierClass}
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
                <option value="Carrier_number">Carrier Number</option>
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
                onClick={getRandomCarrier}
                >
                Random Carrier
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

                {/* { all_Carriers.length == 0 && isQueryEmpty && !noCarriers?
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div> :
                null} */}

            {/* <h4 className="left-h3">Showing Results 1 - {all_Carriers.slice(0, showMore).length} of {all_Carriers.length}</h4> */}
            {/* <h4 className="left-h3">
                    {all_Carriers.length > 0 ? `Showing Results 1 - ${all_Carriers.slice(0, showMore).length} of ${all_Carriers.length}`:
                        "No Carrier Fits Your Search Criteria"}
                </h4> */}

            {allCarriers.length > 0?
                <div className="Carrier-list2">
                    {allCarriers.slice(0, showMore).map(function(carrier, index, arr) {
                        return (
                            <NavLink to={`/carriers/${carrier.id}`} className="nav-link glow2" key={`${carrier.DWCNumber} ${index}`}>
                                <div className={1 ? `big${carrier.carrier_class}5` : "bigNoClass2"}>
                                    <h3 style={{fontWeight: "600", margin: "12px"}}>{carrier.name}</h3>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{carrier.address}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>Fax: {carrier.fax}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>Email: {carrier.email}</h5>
                                    {/* <h5 style={{fontWeight: "600", margin: "12px"}}>{carrier.carrierName}</h5> */}
                                    {/* <h5 style={{fontWeight: "600", margin: "12px"}}>{carrier.claimNumber}</h5> */}
                                </div>
                            </NavLink>
                        );
                    })}
                </div>: null
            }
            {/* {showMore < all_carriers.length ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"3%"}}
                    onClick={handleShowMore}>
                    Show More carriers ({all_carriers.length - showMore} Remaining)
                </button>:
                null
            } */}
        </div>
    );
}

export default CarriersPage;
