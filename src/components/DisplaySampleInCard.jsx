import React from "react";
import {Grid, List, ListItem, Divider, Paper} from "@mui/material";
export default function ({data, dataUnits}) {
    let items = [];
    for (let k in data) {
        items.push(
            <>
                <ListItem sx={{padding: "0"}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                            padding: "12px 12px",
                        }}
                    >
                        <strong>
                            {k === "ph"
                                ? "pH"
                                : k.replace(/([a-z])([A-Z])/g, `$1 $2`).toUpperCase()}

                        </strong>
                        <span>
                            {data[k]}
                            {dataUnits[k]}
                        </span>
                    </div>
                </ListItem>
                <Divider />
            </>
        );
    }
    return <Paper variant='outlined' elevation={0}><List>{items}</List></Paper>;
}
