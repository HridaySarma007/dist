import React, {useState, useEffect} from "react";
import {
    Box,
    Paper,
    Button,
    Grid,
    List,
    ListItem,
    Divider,
    IconButton,
    InputBase,
    Container,
} from "@mui/material";
import {
    EditOutlined,
    Visibility,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../../utils/index";
import authHeader from "../../utils/auth-header";
import DropDown from "../dropdown";
import Spinner from "../Spinner/Spinner";
import NoData from "../Spinner/NoData";
import ApiErrorHandler from "../../utils/ApiErrorHandler";

const CustomersListMobile = () => {
    const user = useSelector((state) => state.auth.user);
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBy, setSeacrhBy] = useState("name");
    const [order, setOrder] = useState("ASC");
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loadCustomers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("customers", {headers: authHeader()});
            setCustomers(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            ApiErrorHandler(error, navigate);
        }
    };

    const fetchCustomers = async () => {
        try {
            const res = await api.get(`customers?page=${currentPage}`, {
                headers: authHeader(),
            });
            setCustomers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [currentPage]);
    const searchCustomers = async () => {
        try {
            const res = await api.get(`customers?${searchBy}=${searchValue}`, {
                headers: authHeader(),
            });
            setCustomers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const searchCustomersByOrder = async (order) => {
        const res = await api.get(`customers?order=${order}`, {
            headers: authHeader(),
        });
        setCustomers(res.data.data);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }

    const items = [
        {label: "Name", value: "name"},
        {label: "Email", value: "email"},
        {label: "Mobile", value: "mobile"},
        {label: "State", value: "state"},
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
                <Grid container marginBottom="20px">
                    <Grid item xs={12} md={6} lg={7}>
                        <Link to="/customer/add" style={{textDecoration: "none"}}>
                            {" "}
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                disableElevation
                                color='secondary'
                                sx={{float: "right", borderRadius: "2em"}}
                            >
                                Add customer
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12} xs={12} lg={4}>
                        <DropDown
                            onClick={(v) => setSeacrhBy(v.value)}
                            defaultValue={{label: "Name", value: "name"}}
                            items={items}
                        />
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height:"36px",
                                mt: 1,
                                mx:1
                            }}
                            elevation={0}
                            variant="outlined"
                        >
                            <InputBase
                                sx={{ml: 1, flex: 1, height:"32px"}}
                                placeholder="Search "
                                inputProps={{"aria-label": "search ", size: "small"}}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <IconButton onClick={searchCustomers}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Divider sx={{marginTop: "1em"}} />
            <Box sx={{bgcolor: "white", padding: 0}}>
                <List sx={{padding: 0}}>
                    {customers.length > 0 ? (
                        customers.map((customer, index) => (
                            <>
                                <ListItem
                                    key={customer.id}
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
                                            <span
                                                style={{
                                                    wordBreak: "break-all",
                                                    hyphens: "manual",
                                                }}
                                            >
                                                {customer.fullName}
                                            </span>
                                            <br />
                                            <small style={{marginTop: "5px"}}>
                                                {customer.type}
                                            </small>
                                        </div>
                                        <small style={{marginTop: "5px"}}>{customer.email}</small>
                                        {customer.isActive ? (
                                            <span style={{color: "#2e7d32", marginTop: "5px"}}>
                                                Active
                                            </span>
                                        ) : (
                                            <span style={{color: "#FF0000", marginTop: "5px"}}>
                                                Blocked
                                            </span>
                                        )}
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
                                            <Link to={`/customer/view/${customer.id}`}>
                                                <Visibility color="success" fontSize="2em" />
                                            </Link>
                                        </IconButton>
                                        {user.role === "SUPER_USER" ? (
                                            <IconButton size="small" fullWidth>
                                                <Link to={`/customer/edit/${customer.id}`}>
                                                    <EditOutlined color="info" fontSize="2em" />
                                                </Link>
                                            </IconButton>
                                        ) : undefined}

                                        {/*<IconButton size="small" fullWidth>
                      <Link to={`/customer/delete/${customer.id}`}>
                        <DeleteOutlined color="error" fontSize="2em" />
                      </Link>
                  </IconButton>*/}
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
                    <ArrowLeftIcon/>
                </IconButton>
                <IconButton
                    onClick={goToNextPage}
                >
                    <ArrowRightIcon/>
                </IconButton>
            </div>
            <br />
        </>
    );
};

export default CustomersListMobile;
