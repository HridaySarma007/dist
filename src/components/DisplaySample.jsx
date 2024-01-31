import React from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function ({data, dataUnits,isTea}) {
    const renderRows = () => {
        let rows = [];
        for (let k in data) {
            if (isTea){
                if (k != "nitrogen" && k != "phosphorus" && k != "temperature" && k != "moisture" && k !='ec' && k != 'ec'){
                    rows.push(
                        <TableRow>
                            <TableCell>
                                {k === "ph"
                                    ? "pH"
                                    : k.replace(/([a-z])([A-Z])/g, `$1 $2`).toUpperCase()}
                            </TableCell>
                            <TableCell align="center">{data[k]}</TableCell>
                            <TableCell align="right">{dataUnits[k] || ""}</TableCell>
                        </TableRow>
                    );
                }

            }else {
                rows.push(
                    <TableRow>
                        <TableCell>
                            {k === "ph"
                                ? "pH"
                                : k.replace(/([a-z])([A-Z])/g, `$1 $2`).toUpperCase()}
                        </TableCell>
                        <TableCell align="center">{data[k]}</TableCell>
                        <TableCell align="right">{dataUnits[k] || ""}</TableCell>
                    </TableRow>
                );
            }
        }
        return rows;
    };
    return (
        <Grid item xs={12} md={12} lg={12} >
            <TableContainer
                component={Paper}
                variant='outlined'
                elevation={0}
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold"}}>Parameter</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="center">
                                Test Value
                            </TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="right">
                                Unit
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderRows()}</TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
