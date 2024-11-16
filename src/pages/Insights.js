import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import InsightDetails from "../components/InsightDetails"
import { SharedContext } from "../context/SharedContext";
export default function Insights() {
  var username;
  const [locationProfiles, setLocationProfiles] = useState([]);

  const [getInsightState, setInsightsState] = useState([]);
  const [getInsightsCity, setInsightsCity] = useState([]);
  const [contextHospitals, setcontextHospitals] = useState();
  const [getDrName, setDrName] = useState("");
  const userlogo = localStorage.getItem("username");
  const mail = localStorage.getItem("mail");


 
  return (
    <Fragment>
      <SharedContext.Provider value={{getInsightState, setInsightsState, getInsightsCity, contextHospitals, setcontextHospitals, setInsightsCity, getDrName, setDrName , setLocationProfiles}}>
        <Navbar username={username} serach={mail === "manipal@gmail.com" ? true : false} insights={true}></Navbar>
        <InsightDetails></InsightDetails>
      </SharedContext.Provider>
    </Fragment>
  );
}
