import React, { Fragment, useContext, useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import "../stylesheet/Dashboard.css";





export default function ContentContainer(props) {
 

  return (
    <Fragment>
      <div
        className="content-container-2 ms-5 me-4"
       
      >
        {props.data.map((item) => {
          return Object.entries(item).map(([key, value]) => {
            // Skip the "_id" field
            if (key !== "_id") {
              return <CardContainer head={key} val={value} key={key} />;
            }
            return null;
          });
        })}
      </div>
    </Fragment>
  );
}
