import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";

import BasicDetailsComponent from "../components/BasicDetailsComponent";
import { SharedContext } from "../context/SharedContext";
export default function DocReport() {
  var username;

  const mail = localStorage.getItem("mail");


  const [getDrName, setDrName] = useState("");

  return (
    <Fragment>
      <SharedContext.Provider value={{ getDrName, setDrName}}>
        <Navbar username={username} serach={mail === "manipal@gmail.com" ? true : false} docreport={true} ></Navbar>
        <BasicDetailsComponent></BasicDetailsComponent>
      </SharedContext.Provider>
    </Fragment>
  );
}
