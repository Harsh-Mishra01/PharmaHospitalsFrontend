import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { NewMenuBar } from "./FilterPopover";
import { Navigate, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { FaSearch } from "react-icons/fa";
import { SharedContext } from "../context/SharedContext";




export default function Navbar() { 
  const { setContextMonth } = useContext(SharedContext);
  const [getMonth, setMonth] = useState();
  const navigate = useNavigate(); 

    function monthHandelar(e) {
      setMonth(e.target.value);
    }
  
    function monthseter() {
      setContextMonth(getMonth);
    }






    return (
        <>
           <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="16px"
          borderBottom="1px solid #ddd"
        >
          <NewMenuBar></NewMenuBar>
          
          <div
              className="datepicker"
             
            >
              <div className="data_list_selection m-1">
                <div className="input-group">
                  <select
                    value={getMonth}
                    onChange={monthHandelar}
                    onInputCapture={monthHandelar}
                    style={{
                      width: "80%",
                      borderRadius: " 10px 0px 0 10px",
                      padding: "4px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                  >
                    <option value="">Select Month...</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                  </select>

                  <button
                    onClick={() => {
                      monthseter();
                    }}
                    style={{
                      borderRadius: " 0px 10px 10px 0px",
                      border: "1px solid #ccc",
                      outline: "none",
                     
                    }}
                  >
                    <FaSearch className="CircleRightIcon" />
                  </button>
                </div>
              </div>
            </div>
       
        </Box>
        </>
    )


}  