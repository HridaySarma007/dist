import {KeyboardArrowLeft, KeyboardArrowRight, Visibility} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
    IconButton, InputBase, Paper,
    Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import authHeader from "../../utils/auth-header";
import {formatDateTime} from "../../utils/helpers";
import api from "../../utils/index";
import DropDown from "../dropdown";
import NoData from "../Spinner/NoData";
import Spinner from "../Spinner/Spinner";


const TeaReports = () => {

    const [searchBy, setSearchBy] = useState("ref-no");
    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState("DESC");

    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();


    const fetchCustomers = async () => {
        const res = await api.get("customers", {
            headers: authHeader(),
        });
        setCustomers(res.data.data);
    };

    const loadReports = async () => {
        setLoading(true);
        try {
            const res = await api.get("test-results/tea", {
                headers: authHeader(),
            });
            setReports(res.data.data);
            setLoading(false);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadReports();
        fetchCustomers();
    }, []);

    useEffect(() => {
        loaded;
        setLoaded(true)
    }, [currentPage]);

    const search = async () => {
        console.log("I am searching !")
        const res = await api.get(
            `test-results/tea?${searchBy}=${searchValue}&order=${order}&page=${currentPage}`,
            {
                headers: authHeader(),
            }
        );
        setReports(res.data.data);
    }

    const searchReports = async (e) => {
        search();
        e.preventDefault();
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
        search();
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
        search();
    }

    const items = [
        {label: "Reference no", value: "ref-no"},
        {label: "Village", value: "village"},
        {label: "State", value: "state"},
        {label: "District", value: "district"},
        {label: "Sub district", value: "subdistrict"},
    ];

    if (loading) {
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
                <Spinner/>
            </div>
        );
    }
    return (
        <>
            <Stack spacing={2}>
                <div style={{display: "flex", justifyContent: "start"}}>
                    <DropDown
                        onClick={(v) => setSearchBy(v.value)}
                        defaultValue={{label: "Reference no", value: "ref-no"}}
                        items={items}
                    />
                    <DropDown
                        onClick={(v) => setOrder(v.value)}
                        defaultValue={{label: "ASC", value: "ASC"}}
                        items={[
                            {label: "ASC", value: "ASC"},
                            {label: "DESC", value: "DESC"},
                        ]}
                    />
                    <Paper
                        component="form"
                        onSubmit={searchReports}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "36px"
                        }}
                        elevation={0}
                        variant="outlined"
                    >
                        <InputBase
                            onSubmit={searchReports}
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search "
                            inputProps={{"aria-label": "search ", size: "small"}}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <IconButton onClick={searchReports}>
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </div>
                <Paper elevation={0} variant='outlined'>
                    {reports.length > 0 ? (
                        <TableContainer component={Paper} elevation={0}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                <strong>Ref no.</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Customer Name</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>Grower Reg No</strong>
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
                                                <strong>Village</strong>
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
                                    {reports.map((row, index) => (
                                        <TableRow
                                            style={{height: "6rem"}}
                                            hover
                                            key={row.id}
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                        >
                                            <TableCell>{row.refNo}</TableCell>
                                            <TableCell>
                                                {customers.map((customer, index) =>
                                                    customer.id === row.customerId ? (
                                                        <td key={index}>{customer.fullName}</td>
                                                    ) : undefined
                                                )}
                                            </TableCell>
                                            <TableCell>{row.grower.reg_no}</TableCell>
                                            <TableCell>{row.district}</TableCell>
                                            <TableCell>{row.subdistrict}</TableCell>
                                            <TableCell>{row.village}</TableCell>

                                            <TableCell>{formatDateTime(row.additionalParameters != null ? row.additionalParameters.testedAt : "NULL")}</TableCell>
                                            <TableCell>
                                                <Link to={"/tea_report/view/" + row.id}>
                                                    <Tooltip title="view report">
                                                        <IconButton>
                                                            <Visibility color="success"/>
                                                        </IconButton>
                                                    </Tooltip>
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
                            <NoData/>
                        </div>
                    )}
                </Paper>
            </Stack>
            <br/>
            <div style={{marginLeft: "auto", width: 300, display: "flex", justifyContent: "space-evenly",}}>
                <IconButton
                    disabled={currentPage === 1}

                    onClick={() => goToPreviousPage()}
                >
                    <KeyboardArrowLeft/>
                </IconButton>

                <IconButton
                    onClick={() => goToNextPage()}
                >
                    <KeyboardArrowRight/>
                </IconButton>
            </div>
            <br/> <br/>
        </>
    );
};

export default TeaReports;
