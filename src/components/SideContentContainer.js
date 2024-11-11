import React, { Fragment, useContext, useEffect, useState } from "react";
import SecondCardContainer from "./SecondCardContainer";
import "../stylesheet/Dashboard.css"

export default function SideContentContainer(props) {


  return (
    <Fragment>
      <div className="right-container-1">
        {props.data.map((item) => {
          return Object.entries(item).map(([key, value]) => {
            // Skip the "_id" field
            if (key !== "_id") {
              return <SecondCardContainer head={key} val={value} key={key} />;
            }
            return null;
          });
        })}
      </div>
    </Fragment>
  );
}
