import {KeyboardArrowLeft, KeyboardArrowRight, Visibility} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box, Container, Divider, Grid, IconButton, InputBase, List,
    ListItem, Paper
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import authHeader from "../../utils/auth-header";
import api from "../../utils/index";
import DropDown from "../dropdown";
import NoData from "../Spinner/NoData";
import Spinner from "../Spinner/Spinner";

const FarmerReportsMobile = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchBy, setSeacrhBy] = useState("village");
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState([]);

    const config = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const fetchCustomers = async () => {
        try {
            const res = await api.get("customers", config);
            setCustomers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const loadReports = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("test-results", config);
            setReports(res.data.data);
            setIsLoading(false);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await api.get(`test-results?page=${currentPage}`, config);
            setReports(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadReports();
        fetchCustomers();
    }, []);

    useEffect(() => {
        fetchReports();
    }, [currentPage]);

    const searchReports = async () => {
        const res = await api.get(`test-results?${searchBy}=${searchValue}`, {
            headers: authHeader(),
        });
        setReports(res.data.data);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }

    const items = [
        {label: "Reference no", value: "ref-no"},
        {label: "Village", value: "village"},
        {label: "State", value: "state"},
        {label: "District", value: "district"},
        {label: "Sub district", value: "subdistrict"},
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
            <Container sx={{marginTop: "1em"}}>
                <Grid container>
                    <Grid item sm={12} xs={12} lg={4}>
                        <DropDown
                            onClick={(v) => setSeacrhBy(v.value)}
                            defaultValue={{label: "Village", value: "village"}}
                            items={items}
                        />
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: '36px',
                                mt: 1,
                                mx: 1
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
                                            {customers.map((customer, _index) =>
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
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Link to={`/report/view/${report.id}`}>
                                            <IconButton
                                                size="small"
                                                fullWidth
                                                sx={{margin: "0 10px 0 10px"}}
                                            >
                                                <Visibility color="success" fontSize="2em" />
                                            </IconButton>
                                        </Link>
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
            <div style={{display: "flex", justifyContent: "end", margin: "1em"}}>
                <IconButton
                    disabled={currentPage === 1}
                    sx={{marginRight: "1em"}}
                    onClick={goToPreviousPage}
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={goToNextPage}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </div>
            <br />
        </>
    );
};

export default FarmerReportsMobile;
