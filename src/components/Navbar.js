import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { FaSearch } from "react-icons/fa";
import { SharedContext } from "../context/SharedContext";
import ExcelJS from "exceljs";
import * as FileSaver from "file-saver";




export default function Navbar(props) { 





const { setDrName } = useContext(SharedContext);
const {  setContextMonth } = useContext(SharedContext);

const [getAllnames, setAllNames] = useState();
const [getName, setName] = useState();
const [getState, setState] = useState();
const [getStates, setStates] = useState();
const [getCity, setCity] = useState();
const [getCitys, setCitys] = useState();
const [getMonth, setMonth] = useState();
const api = localStorage.getItem("API");
const user = localStorage.getItem("user");
const [logo, setLogo] = useState("");
const [email, setEmai] = useState("");
const [isNavContentsVisible, setNavContentsVisible] = useState(true);








useEffect(() => {
  const storedLogo = localStorage.getItem("logo");

  if (storedLogo) setLogo(storedLogo);
}, []);



function nameHandelar(e) {
  setName(e.target.value);
}

function nameseter() {
  setDrName(getName);
}

function monthHandelar(e) {
  setMonth(e.target.value);
}

function monthseter() {
  setContextMonth(getMonth);
}

// async function filterApi() {
//   try {
//     const response = await fetch(`${api}/getfilterdata`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ state: getState, branch: getCity }),
//     });
//     const data = await response.json();

//     setLocationProfiles(data.countOfProfiles);
//     if (data.result[0].branches && data.result[0].branches.length > 0) {
//       setCitys(data.result[0].branches);
//     }
//     setAllNames(data.result[0].businessNames);

//     if (!props.serach) {
//       setContextCity(getCity);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }








useEffect(() => {
  async function getAllDoctrosNames() {
    const docNames = await fetch("" + api + "/getAllDocNames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allNames = await docNames.json();
    setAllNames(allNames);
  }
  async function getallLoc() {
    const locDetails = await fetch("" + api + "/getunquelocdata", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getlocdetails = await locDetails.json();
    //console.log("check it --------------------->", getlocdetails);
    setStates(getlocdetails[0].states);
    setCitys(getlocdetails[0].branches);
  }
  getallLoc();
  getAllDoctrosNames();

  const logo = localStorage.getItem("logo");
  if (logo) {
    setLogo(logo);
  }

  const mail = localStorage.getItem("mail");
  if (mail) {
    setEmai(mail);
  }
}, [getState]);

const exportExcel = (excelData) => {
  const title = "Doctor Details";
  // const details = excelData.result[0]["details"];
  const details = excelData.result[0]["details"].map((detail) => ({
    ...detail,
    businessName: detail.businessName.split("|")[0].trim(),
  }));

  // Column header mapping for aliasing
  const columnMapping = {
    businessName: "Dr Name",
    googleSearchMobile: "GS - Mobile",
    googleSearchDesktop: "GS - Desktop",
    googleMapsMobile: "GM - Mobile",
    googleMapsDesktop: "GM - Desktop",
    calls: "Phone Calls",
    directions: "Direction Clicks",
    websiteClicks: "Website Clicks",
    month: "Month",
    state: "State",
    branch: "Branch",
  };

  const columnOrder = [
    "businessName",
    "googleSearchMobile",
    "googleSearchDesktop",
    "googleMapsMobile",
    "googleMapsDesktop",
    "calls",
    "directions",
    "websiteClicks",
    "month",
    "state",
    "branch",
  ];

  let workbook = new ExcelJS.Workbook();
  let worksheet = workbook.addWorksheet("details");
  worksheet.properties.outlineLevelCol = 2;
  worksheet.properties.defaultRowHeight = 55;

  // Adding Header Row
  let header = columnOrder.map((col) => columnMapping[col]);
  let headerRow = worksheet.addRow(header);
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "b7274c" },
    };

    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
      vertAlign: "superscript",
    };
    cell.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Adding Data Rows
  details.forEach((row, rowIndex) => {
    let rowData = columnOrder.map((col) => row[col] ?? ""); // Ensure an empty string if the value is missing
    let excelRow = worksheet.addRow(rowData);
    excelRow.eachCell((cell, number) => {
      cell.font = {
        vertAlign: "superscript",
        size: 12,
      };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  worksheet.columns.forEach((column) => {
    column.width = 15;
  });

  worksheet.eachRow((row, rowNumber) => {
    row.height = 55;
  });

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, title + ".xlsx");
  });
};

async function getAllDoctrosDetails(getState, getCity) {
  const docDetails = await fetch("" + api + "/getAllDocDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: getState, branch: getCity }),
  });
  const allDetails = await docDetails.json();
  //console.log("All Doctor details State and branch wise : ", allDetails);
  exportExcel(allDetails);
}
function bulkExport() {
  getAllDoctrosDetails(getState, getCity);
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
          {/* <NewMenuBar></NewMenuBar> */}
          <div className="me-5">
            <div
              className={`filter-contents  ${
                isNavContentsVisible ? "show" : ""
              }`}
              style={{
                display: props.worktracker ? "none" : "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="filers_sprding">




                  {/* <label>Select Doctor:</label>&nbsp; */}
                  <div
                  className="data_list_selection m-1"
                  style={{
                    display:
                      props.docreport || props.insights ? "block" : "none",
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      list="getDoctor"
                      placeholder="Doctor Name"
                      value={getName}
                      onInputCapture={nameHandelar}
                      style={{
                        width: "150px",
                        borderRadius: " 10px 0px 0 10px",
                        padding: "4px",
                        border: "1px solid #ccc",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={nameseter}
                      style={{
                        borderRadius: " 0px 10px 10px 0px",
                        border: "1px solid #ccc",
                        outline: "none",
                        padding: "4px",
                        backgroundColor: "#AAA7CD",
                        // display:
                        //   email === "aristro@gmail.com" ||
                        //   email === "microlabs@gmail.com"
                        //     ? "none"
                        //     : "",
                      }}
                    >
                      <FaSearch className="CircleRightIcon" />
                    </button>
                  </div>
                </div>
                {(getAllnames) && (
                  <datalist id="getDoctor">
                    {(getAllnames
                    ).map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </datalist>
                )}

              </div>
            </div>
            </div>
          
            <div
              className="datepicker me-3.5"
              style={{ display: props.monthfilter ? "block" : "none" }}
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
                    {/* Map over monthsCalls array to create options */}
                    {props.monthsCalls?.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      monthseter();
                    }}
                    style={{
                      borderRadius: " 0px 10px 10px 0px",
                      border: "1px solid #ccc",
                      outline: "none",
                      padding: "4px", 
                      backgroundColor: "#AAA7CD",
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