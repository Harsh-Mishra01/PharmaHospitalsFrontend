import React, { useEffect, useState, useContext } from "react";
//import "../stylesheets/docreport.css";
import { SharedContext } from "../context/SharedContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import DoctorTableComponent from "../components/DoctorTableComponent";

export default function TopDoctorDetails({ contextHospitals }) {
  const [docData, setDocData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [insightdata, setInsightData] = useState(null);


  const { getDrName, getInsightState, getInsightsCity } = useContext(SharedContext);
  const username = localStorage.getItem('username');

  const api = localStorage.getItem("API");

  const prefix = username === "piindustries@gmail.com" ? "Shop" : "Dr."



  useEffect(() => {
    console.log("getInsightState" + getInsightState + "getInsighCity : " + getInsightsCity + "getContextHospitals : " + contextHospitals);
  })



  useEffect(() => {
    async function fetchDataFilter() {

      const location = contextHospitals ? contextHospitals : getInsightsCity;
      const cluster = contextHospitals ? "" : getInsightState;

      if (getInsightState || getInsightsCity || contextHospitals) {
        console.log("Hello" + 1)
        try {
          const response = await fetch(api + "/topdoc", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              state: cluster,
              branch: location,
            }),
          });
          const data = await response.json();
          setInsightData(data);
          if (getInsightState.length > 0 || getInsightsCity.length > 0 || contextHospitals > 0) {
            setIsLoading(false);
          }
          // setIsLoading(false)
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        }
      }
    }
    fetchDataFilter();
  }, [getInsightState, getInsightsCity, contextHospitals]);



  useEffect(() => {
    async function fetchTopDocdata() {
      try {
        const response = await fetch(api + "/topdoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        });
        const data = await response.json();
        setInsightData(data);

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }

    }
    fetchTopDocdata();
  }, []);


  const rows = docData?.result
    ? [docData.result]
    : insightdata
      ? [insightdata]
      : [];

  // Function to download PDF
  const downloadPDF = () => {
    const input = document.querySelector("#capture");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      // Set the margins to 0
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
        null,
        'FAST' // Optional: Use 'FAST' to speed up the rendering
      );

      pdf.save("docreport.pdf");
    });
  };


  return (
    <>
      {isLoading ? (
        <div>
          {/* <ShimmerThumbnail className="m-2 p-2" height={200} rounded />
          <ShimmerTitle line={2} gap={10} variant="primary" /> */}
        </div>
      ) : (
        (getDrName || getInsightState || getInsightsCity || contextHospitals) && (
          <div
            id="capture"

          >
            {docData ? (
              <div className="maniContainer  ">

                {rows.length > 0 && (
                  <DoctorTableComponent
                    bcolor="white"
                    title="Monthly Improvement Report"
                    head={[
                      prefix + " Name",
                      "Phone Calls",
                      "Directions Clicks",
                      "Website Clicks",
                      "GS - Mobile",
                      "GS - Desktop",
                      "GM - Mobile",
                      "GM - Desktop",
                    ]}
                    rows={rows}
                  />
                )}
              </div>
            ) : (
              <div className="maniContainer m-3">
                {rows.length > 0 && (
                  <DoctorTableComponent
                    bcolor="white"
                    title="Monthly Improvement Report"
                    head={[
                      prefix + " Name",
                      "Phone Calls",
                      "Directions Clicks",
                      "Website Clicks",
                      "GS - Mobile",
                      "GS - Desktop",
                      "GM - Mobile",
                      "GM - Desktop",

                    ]}
                    rows={rows}
                  />
                )}
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}
