import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
import ReviewManagement from "../components/ReviewManagement";
import { SharedContext } from "../context/SharedContext";

export default function Review() {
    const [getDrName, setDrName] = useState("");


    return (
        <>
            <Fragment>
                <SharedContext.Provider value={{ getDrName, setDrName }}>
                    <Navbar docreport={true} ></Navbar>
                    <ReviewManagement/>
                </SharedContext.Provider>
            </Fragment>
        </>
    )
}