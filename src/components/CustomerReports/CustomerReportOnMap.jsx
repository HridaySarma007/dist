import React from "react";
import { useLocation } from "react-router-dom";
import Map from "../Map";

export default function ({ data }) {
  const location = useLocation();
  const dataUnits = location.state.dataUnits;
  console.log(dataUnits)
  function displayPopup(item,ref_no,units) {
  
    let list = [];
    for (let key in item) {
      list.push(`<li>${key.toUpperCase()} : ${item[key]}${" "}${units[key]}</li>`);
    }
    return `
         
          <div>
          <h4>Reference no:${ref_no}</h4>
          <hr/>
            <ol>
             ${list.join("")}
            </ol>
          </div>
        `;
  }

  return (
    <Map
      filterButton={false}
      data={data}
      dataUnits={dataUnits}
      zoom={15}
      displayPopupProp={(item,ref_no,units) => displayPopup(item,ref_no,units)}
      circleProps={{ color: "#fa0000", radius: 5 }}
    />
  );
}
