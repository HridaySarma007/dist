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
    Search,
    Add,
    VpnKey,
    Visibility,
    EditOutlined,
} from "@mui/icons-material";
import {yellow} from "@mui/material/colors";
import {Link, useNavigate} from "react-router-dom";
import api from "../../utils/index";
import authHeader from "../../utils/auth-header";
import DropDown from "../dropdown";
import Spinner from "../Spinner/Spinner";
import NoData from "../Spinner/NoData";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

const UsersListMobile = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBy, setSeacrhBy] = useState("name");
    const [order, setOrder] = useState("ASC");
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("users", {headers: authHeader()});
            setUsers(response.data.data);
            setIsLoading(false);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get(`users?page=${currentPage}`, {
                headers: authHeader(),
            });
            setUsers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const searchUsers = async () => {
        try {
            const res = await api.get(`users?${searchBy}=${searchValue}`, {
                headers: authHeader(),
            });
            setUsers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const searchUsersByOrder = async (order) => {
        const res = await api.get(`users?order=${order}`, {
            headers: authHeader(),
        });
        setUsers(res.data.data);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function goToNextPage() {
        setCurrentPage(currentPage + 1);
    }

    const items = [
        {label: "Name", value: "name"},
        {label: "Username", value: "username"},
        {label: "Email", value: "email"},
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
                        <Link to="/user/add" style={{textDecoration: "none"}}>
                            {" "}
                            <Button
                                startIcon={<Add />}
                                variant="contained"
                                color='secondary'
                                disableElevation
                                sx={{float: "right", borderRadius: "2em"}}
                            >
                                Add user
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
                                height:'36px',
                                mx:1,
                                mt:1
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
                            <IconButton onClick={searchUsers}>
                                <Search />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Divider sx={{marginTop: "1em"}} />
            <Box sx={{bgcolor: "white", padding: 0}}>
                <List sx={{padding: 0}}>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <>
                                <ListItem
                                    key={user.id}
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
                                                {user.name}
                                            </span>
                                            <br />
                                            <small style={{marginTop: "5px"}}>{user.role}</small>
                                        </div>
                                        <small style={{marginTop: "5px"}}>{user.email}</small>
                                        {user.isActive ? (
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
                                        <Link to={`/user/view/${user.id}`}>
                                            <IconButton
                                                size="small"
                                                fullWidth
                                                sx={{margin: "0 10px 0 10px"}}
                                            >
                                                <Visibility color="success" fontSize="2em" />
                                            </IconButton>
                                        </Link>
                                        <Link to={"/user/edit/" + user.id}>
                                            <IconButton>
                                                <EditOutlined color="info" />
                                            </IconButton>
                                        </Link>

                                        <Link to={`/user/change-password/${user.id}`}>
                                            <IconButton
                                                size="small"
                                                fullWidth
                                                sx={{margin: "0 10px 0 10px"}}
                                            >
                                                <VpnKey sx={{color: yellow[800]}} fontSize="2em" />
                                            </IconButton>
                                        </Link>

                                        {/*<IconButton size="small" fullWidth>
                      <Link to={`/user/delete/${user.id}`}>
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
            <div style={{display: "flex", justifyContent: "end", margin: "1em"}}>
                <IconButton
                    disabled={currentPage === 1}
                    sx={{marginRight: "1em"}}
                    onClick={goToPreviousPage}
                >
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={goToNextPage}
                >
                    <KeyboardArrowRight/>
                </IconButton>
            </div>
            <br />
        </>
    );
};

export default UsersListMobile;
