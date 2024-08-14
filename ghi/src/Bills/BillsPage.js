import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';


function BillsPage() {

    const [bill, setBills] = useState([]);

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

    const [noBills, setNoBills] = useState(false);

    const getBills = async() =>{
        // const BillsResponse = await fetch("https://pm-deck-react-only.onrender.com/Bills")
        const billResponse = await fetch("http://localhost:4000/Bills/")
        const billData = await billResponse.json()
        if (billData.length == 0 ) {
            setNoBills(true)
        } else {
            // const sortedBills = [...BillsData].sort(sortMethods[sortState].method);
            console.log(billData)
            setBills(billData);
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0);
        getBills();
        console.log(bill)
        // document.title = "Bills - PM BillBase"
        // return () => {
        //     document.title = "PlayMaker BillBase"
        // };
    // eslint-disable-next-line
    },[]);

    // const sortMethods = {
    //     none: { method: (a,b) => new Date(b.updated_on?.full_time) - new Date(a.updated_on?.full_time) },
    //     newest: { method: (a,b) => b.id.localeCompare(a.id) },
    //     oldest: { method: (a,b) => a.id.localeCompare(b.id) },
    //     name: { method: (a,b) => a.name.localeCompare(b.name) },
    //     Bill_number: { method: (a,b) => a.Bill_number - b.Bill_number },
    //     enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
    //     enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    // };

    // const handleQuery = (event) => {
    //     setQuery({ ...query, [event.target.name]: event.target.value });
    //     setShowMore(20)
    //     console.log(Bills)
    //     console.log(query)
    // };

    // const handleQueryReset = (event) => {
    //     setQuery({
    //         BillName: "",
    //         BillText: "",
    //         BillNumber: "",
    //         heroID: "",
    //         series: "",
    //         startingNum: "",
    //         type: "",
    //         BillClass: "",
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

    const allBills = bill
    // const all_Bills = Bills.filter(Bill => Bill.name.toLowerCase().includes(query.BillName.toLowerCase()))
    //     .filter((Bill, index, arr) => (Bill.effect_text + Bill.second_effect_text).toLowerCase().includes(query.BillText.toLowerCase()))
    //     .filter(Bill => Bill.Bill_number.toString().includes(query.BillNumber))
    //     .filter(Bill => Bill.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
    //     .filter((Bill, index, arr) => Bill.series_name.toLowerCase().includes(query.series.toLowerCase()))
    //     .filter(Bill => Bill.Bill_number > query.startingNum - 1)
    //     .filter(Bill => query.type? Bill.Bill_type.some(type => type.toString() == query.type):Bill.Bill_type)
    //     .filter(Bill => Bill.Bill_class.includes(query.BillClass))
    //     .filter(Bill => query.extraEffect? Bill.extra_effects.some(effect => effect.toString() == query.extraEffect):Bill.extra_effects)
    //     .filter(Bill => query.reaction? Bill.reactions.some(reaction => reaction.toString() == query.reaction):Bill.reactions)
    //     .filter(Bill => query.tag? Bill.Bill_tags.some(tag => tag.toString() == query.tag):Bill.Bill_tags)
    //     .filter(Bill => boosterSet && !rarity ? boosterSet.all_Bills.includes(Bill.Bill_number):Bill.Bill_number)
    //     .filter(Bill => boosterSet && rarity ? boosterSet[rarity].includes(Bill.Bill_number):Bill.Bill_number)
    //     .sort(sortMethods[sortState].method)

        // const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="innerContent">
            <h1 className="left-h1">Bill List</h1>
            <NavLink to="/billcreate/create">
                <button>Create</button>
            </NavLink>

            {/* <h2 className="left">Search our collection of Bills</h2> */}
            {/* <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Bill Name Contains..."
                name="BillName"
                value={query.BillName}
                onChange={handleQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-x-x-large"
                type="text"
                placeholder=" Bill Text Contains..."
                name="BillText"
                value={query.BillText}
                onChange={handleQuery}>
            </input>
            <br/>
            <select
                className="left dcbsearch-x-large dcbsearch-switch"
                type="text"
                placeholder=" Bill Set"
                onChange={handleBoosterSetChange}
                name="boosterSet"
                value={boosterSetId}>
                <option value="">Bill Set</option>
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
                placeholder=" Bill Number"
                style={{width: "177px", height: "37px"}}
                name="BillNumber"
                value={query.BillNumber}
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
                name="BillClass"
                value={query.BillClass}
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
                <option value="Bill_number">Bill Number</option>
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
                onClick={getRandomBill}
                >
                Random Bill
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

                {/* { all_Bills.length == 0 && isQueryEmpty && !noBills?
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div> :
                null} */}

            {/* <h4 className="left-h3">Showing Results 1 - {all_Bills.slice(0, showMore).length} of {all_Bills.length}</h4> */}
            {/* <h4 className="left-h3">
                    {all_Bills.length > 0 ? `Showing Results 1 - ${all_Bills.slice(0, showMore).length} of ${all_Bills.length}`:
                        "No Bill Fits Your Search Criteria"}
                </h4> */}

            {allBills.length > 0?
                <div className="Bill-list2">
                    {allBills.slice(0, showMore).map(function(bill, index, arr) {
                        return (
                            <NavLink to={`/bills/${bill.id}`} className="nav-link glow2" key={`${bill.id} ${index}`}>
                                <div className={1 ? `big${bill.bill_class}5` : "bigNoClass2"}>
                                    <h3 style={{fontWeight: "600", margin: "12px"}}>{bill.patientLastName}, {bill.patientFirstName}</h3>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{bill.claimNumber}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{bill.carrierName}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>DOS: {bill.DOS}</h5>
                                    <h5 style={{fontWeight: "600", margin: "12px"}}>{bill.status}</h5>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>: null
            }
            {/* {showMore < all_bill.length ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"3%"}}
                    onClick={handleShowMore}>
                    Show More bill ({all_bill.length - showMore} Remaining)
                </button>:
                null
            } */}
        </div>
    );
}

export default BillsPage;
