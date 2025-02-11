import React, { useContext } from 'react'
import { Chart } from "react-google-charts";
import "../stylesheet/Dashboard.css"

export default function GraphicalContainer(props) {
    const data = [
        ['Month', 'Count']
    ];
    var count = 0
    Object.entries(props.callsGraphData).map(([key, value]) => {
        count += value
        if(key != "_id")
        {
            const temp = [key, value]
            data.push(temp)
        }
       
    })
    
    const options = {
        title: '',
        hAxis: { title: 'Month', titleTextStyle: { color: '#b1c4e9' } },
        vAxis: { minValue: 0, gridlines: { color: 'transparent' } },
        backgroundColor: { fill: props.bcolor, opacity: 0.8 },
        bar: { groupWidth: "40%" },
        // colors: ["#1b9e77", "#d95f02", "#7570b3"],
        chartArea: { left: 90, right: 90 } ,
        colors: props.gtype === "PieChart" ? ["#1b9e77", "#d95f02", "#7570b3"] : ['#b1c4e9'],         
    };
  return (
    <>
          <div  className="graphical-container m-2" style={{ backgroundColor: ( props.bcolor ),}}>
          <div className="graphs">Last 6 Months - {props.title}</div>
            <center className="m-4">Avg - {(count/6).toFixed(0)}</center>
            <Chart chartType={props.gtype} chartWrapperParams={{ width: '1000px', height: '1200px',  }} data={data} options={options}></Chart>
          </div>
    </>
  )
}
