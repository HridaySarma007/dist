import React from "react";
import Map from "../Map";

export default function ({data}) {
    function displayPopup(item, ref_no, units) {
        let list = [];
        for (let key in item) {
            list.push(`<li><b style="display:inline-block; width:140px">${key.toUpperCase()} :</b> ${item[key]}${" "}${units[key]} </li>`);
        }
        return `
         
          <div>
              <h4>Reference no: ${ref_no}</h4>
              <hr style="color:#f1f1f1; margin-top:-10px"/>
               <ol style="list-style:none; padding:0">
                 ${list.join('')}
               </ol>
          </div>
        `;
    }

    return (
        <Map
            filterButton={false}
            data={data.data}
            dataUnits={data.dataUnits}
            zoom={15}
            displayPopupProp={(item, ref_no, units) => displayPopup(item, ref_no, units)}
            circleProps={{color: "#fa0000", radius: 3}}
        />
    );
}
