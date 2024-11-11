import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { SharedContext } from "../context/SharedContext";
import TopDoctorDetails from "../pages/TopDoctorDetails"

export default function TopDoctor({contextHospitals}) {
  var username;
  const userlogo = localStorage.getItem("username");
  // alert(userlogo)

  return (
    <Fragment>
      
      {/* //<Navbar username={username} serach={false} topdoc={true} blockmenu={true}></Navbar> */}
      <TopDoctorDetails contextHospitals={contextHospitals}  ></TopDoctorDetails>  
        
    </Fragment>
  );
}
