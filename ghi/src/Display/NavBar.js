import { NavLink } from "react-router-dom";
import './NavBar.css'
import React, { useEffect, useState, useRef } from "react";


function NavBar(){
    const [show, setShow] = useState(false)

    return(
        <nav className="navbar">
            <ul className="navMenu nav">
                <span className="navHome">
                    <li className="navMenuItem">
                        <NavLink className="navBarLink white" to="/">
                            <h1 className="navBrand">
                                Patient RK
                            </h1>
                        </NavLink>
                    </li>
                    <img className="threeBars"
                        onClick={() => setShow(!show)}
                        src="https://i.imgur.com/Q1Y2vV9.png"
                        alt="menu"/>
                </span>
                <li className={show? "navMenuItem": "navMenuItem shrink"}
                    onClick={() => setShow(false)}
                >
                    <NavLink className="navBarLink white" to="/bills">
                        <h2 className="fw-light">
                            Bills
                        </h2>
                    </NavLink>
                </li>

                <li className={show? "navMenuItem": "navMenuItem shrink"}
                    onClick={() => setShow(false)}
                >
                    <NavLink className="navBarLink white" to="/patients">
                        <h2 className="fw-light">
                            Patients
                        </h2>
                    </NavLink>
                </li>

                {/* <li className={show? "navMenuItem": "navMenuItem shrink"}
                    onClick={() => setShow(false)}
                >
                    <NavLink className="navBarLink white" to="/admin">
                        <h2 className="fw-light">
                            Admin
                        </h2>
                    </NavLink>
                </li> */}

                <li className={show? "navMenuItem": "navMenuItem shrink"}
                    onClick={() => setShow(false)}
                >
                    <NavLink className="navBarLink white" to="/carriers">
                        <h2 className="fw-light">
                            Carriers
                        </h2>
                    </NavLink>
                </li>
            </ul>
            <ul className="navMenu mediaNav">

                    <NavLink className="navBarLink white" to="/">
                <li className="navMenuItem">
                        <h1 className="navBrand">
                        Patient RK
                        </h1>
                </li>
                    </NavLink>

                    <NavLink className="navBarLink white" to="/bills">
                <li className="navMenuItem">
                        <h2 className="fw-light">
                            Bills
                        </h2>
                </li>
                    </NavLink>

                    <NavLink className="navBarLink white" to="/patients">
                <li className="navMenuItem">
                        <h2 className="fw-light">
                            Patients
                        </h2>
                </li>
                    </NavLink>
{/*
                    <NavLink className="navBarLink white" to="/admin">
                <li className="navMenuItem">
                        <h2 className="fw-light">
                            Admin
                        </h2>
                        </li>
                        </NavLink> */}

                    <NavLink className="navBarLink white" to="/carriers">
                <li className="navMenuItem">
                        <h2 className="fw-light">
                            Carriers
                        </h2>
                </li>
                    </NavLink>
            </ul>
        </nav>
    )
}

export default NavBar
