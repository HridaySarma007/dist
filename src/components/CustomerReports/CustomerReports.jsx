import { DataArray, Visibility } from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
    Avatar, Button, Card,
    CardContent, Divider, Grid, IconButton, InputBase, Paper,
    Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../utils/config";
import { formatDateTime } from "../../utils/helpers";
import api from "../../utils/index";
import DropDown from "../dropdown";
import NoData from "../Spinner/NoData";
import Spinner from "../Spinner/Spinner";
import useSwr from "swr";
import { Box } from "@mui/system";
import _ from "lodash"

const useStyles = makeStyles({
    previous: {
        display: "inline-block",
        textDecoration: "none",
        border: "none",
        marginRight: "5px",
        padding: "8px 16px",
        color: "white",
        backgroundColor: "#1976d2",
        //cursor: pointer
    },
    next: {
        display: "inline-block",
        textDecoration: "none",
        border: "none",
        marginRight: "5px",
        padding: "8px 16px",
        color: "white",
        backgroundColor: "#1976d2",
        //cursor: pointer
    },
    paginateDisabled: {
        backgroundColor: "red",
    },
});

const CustomerReports = () => {
    const classes = useStyles();
    const token = JSON.parse(localStorage.getItem("customer_token"));
    const customer = JSON.parse(localStorage.getItem("customer"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [totalTests, setTotalTests] = useState(undefined);
    const navigate = useNavigate();

    const axiosConfig = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `${config.SOILCARE_API}/test-results/customer/${customer.id}?page=${pageIndex + 1}`
    }

    const fetchReportByCustomer = async (url) => {
        const res = await axios.get(url, axiosConfig);
        !totalTests && setTotalTests(res.data.totalResult)
        return res.data.data;
    };

    const { data, error, isValidating } = useSwr(`${config.SOILCARE_API}/test-results/customer/${customer.id}`, fetchReportByCustomer);


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    const items = [
        { label: "Reference no", value: "ref-no" },
        { label: "State", value: "state" },
        { label: "Village", value: "village" },
        { label: "District", value: "district" },
        { label: "Sub district", value: "subdistrict" }
    ];

    // if (isValidating) {
    //     return (
    //         <div
    //             style={{
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //                 flexDirection: "column",
    //                 paddingTop: "20px",
    //             }}
    //         >
    //             <Spinner />
    //         </div>
    //     );
    // }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="large"><b>Total test results: {totalTests}</b></Button>
            </Box>
            <Stack spacing={2} sx={{ mt: 2 }}>
                <Paper elevation={0} variant='outlined' sx={{mb:4}}>
                    {data ? (
                        <TableContainer component={Paper} elevation={0}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                <strong>Ref no.</strong>
                                            </Typography>
                                        </TableCell>
                                        {/* <TableCell>
                                        //     <Typography>
                                        //         <strong>Grower name</strong>
                                        //     </Typography>
                                        // </TableCell>
                                        // <TableCell>
                                        //     <Typography>
                                        //         <strong>Grower Reg. No</strong>
                                        //     </Typography>
                                        // </TableCell>*/}
                                        <TableCell>
                                            <Typography>
                                                <strong>Village</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>District</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Sub district</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>State</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Date&Time</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Action</strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(row => (
                                        <TableRow
                                            hover
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell>{row.refNo}</TableCell>
                                            {/*<TableCell>{row.grower.name}</TableCell>
                                            <TableCell>{row.grower.reg_no}</TableCell>*/}
                                            <TableCell>{row.village}</TableCell>
                                            <TableCell>{row.district}</TableCell>
                                            <TableCell>{row.subdistrict}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>{formatDateTime(row.additionalParameters != null ? row.additionalParameters.testedAt : "NULL")}</TableCell>
                                            <TableCell>
                                                <Link to={row.grower != null ? "/customer-tea-report/view/" + row.id : "/customer-report/view/" + row.id}>
                                                    <IconButton>
                                                        <Visibility color="success" />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                paddingTop: "20px",
                            }}
                        >
                            <NoData />
                        </div>
                    )}
                </Paper>
            </Stack>
        </>
    );
};

export default CustomerReports;
