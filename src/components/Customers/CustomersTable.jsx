import React, {useState, useEffect} from "react";
import {
    Box,
    Grid,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    Stack,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    IconButton,
    InputBase,
    Collapse,
    Chip,
    Divider,
    Tooltip,
} from "@mui/material";
import {
    MenuOpenOutlined,
    EditOutlined,
    PreviewOutlined,
    DeleteForeverOutlined,
    DeleteOutlined,
    Visibility,
} from "@mui/icons-material";
import {pink} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {Link, useNavigate} from "react-router-dom";
import api from "../../utils/index";
import {useSelector} from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import authHeader from "../../utils/auth-header";
import "./Customers.css";
import {makeStyles} from "@mui/styles";
import DropDown from "../dropdown";
import Spinner from "../Spinner/Spinner";
import NoData from "../Spinner/NoData";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

const CustomersTable = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [openAlert, setOpenAlert] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBy, setSeacrhBy] = useState("name");
    const [order, setOrder] = useState("DESC");
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        const res = await api.get("users", {
            headers: authHeader(),
        });

        setUsers(res.data.data);
        console.log(users);
    };

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`customers?order=${order}`, {headers: authHeader()});
            setCustomers(res.data.data);
            console.log(customers);
            setLoading(false);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    const fetchCustomers = async () => {
        try {
            const res = await api.get(`customers?order=${order}&page=${currentPage}`, {
                headers: authHeader(),
            });
            setCustomers(res.data.data);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadCustomers();
        fetchUsers();
    }, []);

    useEffect(() => {
        search();
    }, [currentPage]);


    const search = async () => {
        const res = await api.get(
            `customers?${searchBy}=${searchValue}&order=${order}&page=${currentPage}`,
            {
                headers: authHeader(),
            }
        );
        setCustomers(res.data.data);

    }

    const searchCustomers = async (e) => {
        e.preventDefault();
        search()
    };

    /*const searchCustomersByOrder = async (order) => {
      const res = await api.get(`customers?order=${order}`, {
        headers: authHeader(),
      });
      setCustomers(res.data.data);
    };
  
    const selectChange = (e) => {
      setSeacrhBy(e.target.value);
    };*/

    const apiCall = async (id) => {
        const res = await api.delete("customers/" + id, config);
        setStatus({type: "success", msg: res.data.message});
        //forceUpdate();
        setOpenAlert(true);
        const resr = await api.get("customers", config);
        setCustomers(resr.data.data);
    };

    const handleToggle = (id) => {
        apiCall(id);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

    {
        /* customers.length > 0 ? (map hehre) : no user found*/
    }

    return (
        <>
            <Stack spacing={2}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
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
                            onSubmit={searchCustomers}
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
                                variant="outlined"
                                size="small"
                                sx={{ml: 1, flex: 1}}
                                placeholder="Search "
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <IconButton onClick={searchCustomers}>
                                <SearchIcon color='primary' />
                            </IconButton>
                        </Paper>

                    </div>
                    <Link to="/customer/add" style={{textDecoration: "none"}}>
                        {" "}
                        <Button
                            style={{marginTop: "20"}}
                            startIcon={<AddIcon />}
                            color="secondary"
                            variant="contained"
                            disableElevation
                            sx={{borderRadius: "3em"}}
                        >
                            Add customer
                        </Button>
                    </Link>
                </div>

                {/* Table starts here */}

                {customers.length > 0 ? (
                    <TableContainer component={Paper} elevation={0} variant="outlined">
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            <strong>NAME</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <strong>MOBILE</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <strong>EMAIL</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <strong>TYPE</strong>
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
                                            <strong>CREATED BY</strong>
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
                                {customers.map((row, index) => (
                                    <TableRow
                                        hover
                                        key={row.id}
                                        sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                    >
                                        <TableCell>{row.fullName}</TableCell>
                                        <TableCell>{row.mobile}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.type}</TableCell>

                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>
                                            {row.isActive ? (
                                                <Chip label="active" size="small" color="success" />
                                            ) : (
                                                <Chip label="blocked" size="small" color="error" />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {users.map((user, index) =>
                                                user.id === row.creatorId ? (
                                                    <td key={index}>{user.name}</td>
                                                ) : undefined
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{display: "flex"}}>
                                                <Link to={"/customer/view/" + row.id}>
                                                    <Tooltip title="view customer">
                                                        <IconButton>
                                                            <Visibility color="success" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                {user.role === "SUPER_USER" && (
                                                    <Link to={"/customer/edit/" + row.id}>
                                                        <Tooltip title="edit customer">
                                                            <IconButton>
                                                                <EditOutlined color="info" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                )}

                                            </div>
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
            </Stack>
            <br />
            <div
                style={{display: "flex", justifyContent: "end", marginBottom: "10px"}}
            >
                <IconButton
                    sx={{mr: 2}}
                    onClick={goToPreviousPage}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    onClick={goToNextPage}
                >
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <br />
            <br />
        </>
    );
};

export default CustomersTable;
