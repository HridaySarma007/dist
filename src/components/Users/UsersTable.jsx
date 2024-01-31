import React, {useState, useEffect} from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    IconButton,
    Chip,
    Typography,
    Tooltip,
} from "@mui/material";
import {EditOutlined, VpnKey, Visibility} from "@mui/icons-material";
import "./User.css";
import {yellow} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import api from "../../utils/index";
import InputBase from "@mui/material/InputBase";
import authHeader from "../../utils/auth-header";
import DropDown from "../dropdown";
import Spinner from "../Spinner/Spinner";
import NoData from "../Spinner/NoData";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import {Box} from "@mui/system";


const UsersTable = ({sx}) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBy, setSeacrhBy] = useState("name");
    const [order, setOrder] = useState("ASC");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isAdmin = () => user.role && user.role === "ADMIN";
    console.log(isAdmin());

    const config = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get("users", config);
            setUsers(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            ApiErrorHandler(error, navigate);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get(`users?page=${currentPage}`, config);
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

    const searchUsers = async (e) => {
        e.preventDefault();
        const res = await api.get(
            `users?${searchBy}=${searchValue}&order-by=${order}`,
            {
                headers: authHeader(),
            }
        );
        setUsers(res.data.data);
    };

    /*const searchUsersByOrder = async (order) => {
      const res = await api.get(`users?order=${order}`, {
        headers: authHeader(),
      });
      setUsers(res.data.data);
    };*/

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
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <Stack spacing={2} sx={sx}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>

                        <DropDown
                            onClick={(v) => setSeacrhBy(v.value)}
                            defaultValue={{label: "Name", value: "name"}}
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
                            onSubmit={searchUsers}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                ml:1,
                                height:"36px"
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
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Box>
                    <Link to="/user/add" style={{textDecoration: "none"}}>
                        {" "}
                        <Button
                            style={{marginTop: "20"}}
                            startIcon={<AddIcon />}
                            variant="contained"
                            color='secondary'
                            disableElevation
                            sx={{borderRadius:"2em"}}
                        >
                            Add user
                        </Button>
                    </Link>
                </div>

                <Paper elevation={0} variant='outlined'>
                    {users.length > 0 ? (
                        <TableContainer component={Paper} elevation={0}>
                            <Table sx={{minWidth: 650}} aria-label="user table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                <strong>SL. NO.</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>NAME</strong>
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography>
                                                <strong>ROLE</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>STATE</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>STATUS</strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>ACTION</strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row, index) => (
                                        <TableRow
                                            hover
                                            key={row.id}
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{row.name}</TableCell>

                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>{row.state}</TableCell>
                                            <TableCell>
                                                {row.isActive === true || row.isActive === null ? (
                                                    <Chip label="active" size="small" color="success" />
                                                ) : (
                                                    <Chip label="blocked" size="small" color="error" />
                                                )}
                                            </TableCell>

                                            <TableCell>

                                                <Link to={"/user/view/" + row.id}>
                                                    <Tooltip title="view user">
                                                        <IconButton>
                                                            <Visibility color="success" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                {user.role === "SUPER_USER" && (
                                                    <Link to={"/user/edit/" + row.id}>
                                                        <Tooltip title="edit user">
                                                            <IconButton>
                                                                <EditOutlined color="info" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                )}
                                                <Link to={`/user/change-password/${row.id}`}>
                                                    <Tooltip title="change password">
                                                        <IconButton>
                                                            <VpnKey sx={{color: yellow[800]}} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                {/*<Link to={"/user/delete/" + row.id}>
                      <IconButton>
                        <DeleteOutlined color="error" />
                      </IconButton>
                    </Link>*/}

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

                <div
                    style={{display: "flex", justifyContent: "end", marginTop: "30px"}}
                >
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
            </Stack>
            <br />
        </>
    );
};

export default UsersTable;
