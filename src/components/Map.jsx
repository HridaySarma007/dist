import React, {useState, useEffect} from "react";
import L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import Filter from "@mui/icons-material/FilterAlt";
let map;
let osm;

/**
 *
 * @param {Array<any>} data
 * @param {{color:string, radius: number}} circleProps
 */
export default function ({
    filterButton,
    data,
    dataUnits,
    zoom,
    circleProps,
    displayPopupProp,
    handleClickOpen,
}) {
    //console.log(data.refNo);
    osm = new L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiaHJpZGF5c2FybWEiLCJhIjoiY2xycnl5b3l2MDFsajJrbndyaWdnc3YydCJ9.0fNsZFbLh6ZrvAG3pKl-HA",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            id: "mapbox/satellite-streets-v11",
            tileSize: 512,
            zoomOffset: -1,
        }
    );

    useEffect(() => {
        document.querySelector(
            "#leaflet-map"
        ).innerHTML = `<div id='map' style='height:100%; width:100%'></div>`;
        map = L.map("map");
        if (data.length > 0) {
            map.setView(data[0].location, zoom || 13);
        } else {
            map.setView([21.387609, 79.21771], 4.5);
        }

        osm.addTo(map);

        data.forEach((d) => {
            console.log(d.refNo)
            L.circle(d.location, {
                radius: circleProps.radius,
                fill: true,
                color: circleProps.color,
                fillColor: circleProps.color,
                fillOpacity: 1,
            })
                .addTo(map)
                .bindPopup(displayPopupProp(d?.samples[0], d?.refNo, dataUnits));
        });
    }, [data]);

    return (
        <div style={{position: "relative", height: "400px"}}>
            {filterButton && (
                <button
                    onClick={handleClickOpen}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 450,
                        height: "33px",
                        width: "33px",
                        background: "#fff",
                        border: "2px solid rgba(0, 0, 0, .2)",
                        borderRadius: "10%",
                        textAlign: "center",
                    }}
                >
                    <Filter
                        sx={{fontSize: "22px", marginTop: "3px", marginLeft: "-2px"}}
                    />
                </button>
            )}

            <div id="leaflet-map" style={{height: "500px", width: "100%"}}></div>
        </div>
    );
}
