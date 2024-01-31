import {
    Visibility, KeyboardArrowLeft, KeyboardArrowRight
} from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SearchIcon from "@mui/icons-material/Search";
import {
    Avatar,
    Box, Button, Card,
    CardContent, Container, Divider, Grid, IconButton, InputBase, List,
    ListItem, Paper, Typography
} from "@mui/material";
import {green} from "@mui/material/colors";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import config from "../../utils/config";
import api from "../../utils/index";
import DropDown from "../dropdown";
import NoData from "../Spinner/NoData";
import Spinner from "../Spinner/Spinner";

const CustomerReportsMobile = () => {
    const token = JSON.parse(localStorage.getItem("customer_token"));
    const customer = JSON.parse(localStorage.getItem("customer"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchBy, setSeacrhBy] = useState("ref-no");
    const [order, setOrder] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState([]);
    const [totalTests, setTotalTests] = useState(undefined);

    const axiosConfig = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const fetchReportByCustomer = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                config.SOILCARE_API + `/test-results?customer-id=${customer.id}`,
                axiosConfig
            );
            setReports(res.data.data);
            setIsLoading(false);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        fetchReportByCustomer();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await api.get(`test-results?customer-id=${customer.id}&page=${currentPage}`, axiosConfig);
            setReports(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [currentPage]);

    const searchReports = async (e) => {
        e.preventDefault();
        const res = await api.get(
            `test-results?${searchBy}=${searchValue}&order-by=${order}`,
            axiosConfig
        );
        setReports(res.data.data);
    };

    const fetchTests = async () => {
        const response = await axios.get(
            config.SOILCARE_API + "/test-results?customer-id=${customer.id}",
            axiosConfig
        );
        setTotalTests(response.data.data.length);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }

    const items = [
        {label: "Reference no", value: "ref-no"},
        {label: "State", value: "state"},
        {label: "Village", value: "village"},
        {label: "District", value: "district"},
        {label: "Sub district", value: "subdistrict"}

    ];

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingTop: "20px",
                }}
            >
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <Grid container sx={{margin: "5px"}}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Card elevation={0} variant='outlined'>
                        <CardContent>
                            <Grid
                                container
                                spacing={2}
                                sx={{justifyContent: "space-between"}}
                            >
                                <Grid item>
                                    <Typography color="textSecondary" gutterBottom variant="h6">
                                        Tests(Total)
                                    </Typography>
                                    <Typography color="textPrimary" variant="h5">
                                        {totalTests}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        sx={{
                                            backgroundColor: green[600],
                                            height: 56,
                                            width: 56,
                                        }}
                                    >
                                        <AssessmentIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br />
            <Container sx={{marginTop: "1em"}}>
                <Grid container>
                    <Grid item sm={12} xs={12} lg={4}>
                        <DropDown
                            onClick={(v) => setSeacrhBy(v.value)}
                            defaultValue={{label: "Reference no", value: "ref-no"}}
                            items={items}
                        />
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height:"36px",
                                mx:1, mt:1
                            }}
                            elevation={0}
                            variant="outlined"
                        >
                            <InputBase
                                sx={{ml: 1, flex: 1}}
                                placeholder="Search "
                                inputProps={{"aria-label": "search ", size: "small"}}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <IconButton onClick={searchReports}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Divider sx={{marginTop: "1em"}} />
            <Box sx={{bgcolor: "white", padding: 0}}>
                <List sx={{padding: 0}}>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <>
                                <ListItem
                                    key={report.id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "left",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>
                                            {customers.map((customer, index) =>
                                                customer.id === report.customerId ? (
                                                    <span
                                                        style={{
                                                            wordBreak: "break-all",
                                                            hyphens: "manual",
                                                        }}
                                                    >
                                                        {customer.fullName}
                                                    </span>
                                                ) : undefined
                                            )}

                                            <br />
                                            <small style={{marginTop: "5px"}}>
                                                {report.village}
                                            </small>
                                        </div>
                                        <small style={{marginTop: "5px"}}>
                                            {report.district}
                                        </small>
                                        <small style={{marginTop: "5px"}}>
                                            {report.refNo}
                                        </small>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            fullWidth
                                            sx={{margin: "0 10px 0 10px"}}
                                        >
                                            <Link to={`/customer-report/view/${report.id}`}>
                                                <Visibility color="success" fontSize="2em" />
                                            </Link>
                                        </IconButton>
                                    </div>
                                </ListItem>
                                <Divider />
                            </>
                        ))
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
                </List>
            </Box>
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    margin: "1em",
                }}
            >
                <IconButton
                    disabled={currentPage === 1}
                    sx={{marginRight: "1em"}}
                    onClick={goToPreviousPage}
                >
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    variant="outlined"
                    type="primary"
                    size="small"
                    onClick={goToNextPage}
                >
                    <KeyboardArrowRight/>
                </IconButton>
            </div>
            <br />
        </>
    );
};

export default CustomerReportsMobile;
