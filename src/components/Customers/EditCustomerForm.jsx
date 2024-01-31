import React, {useState, useEffect} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    useMediaQuery,
    useTheme,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Alert,
    IconButton,
    Collapse,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import api from "../../utils/index";
import config from "../../utils/config";
import axios from "axios";
import {fetchCustomerById} from "../../api";
import authHeader from "../../utils/auth-header";
import ApiErrorHandler from "../../utils/ApiErrorHandler";

const EditCustomerForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string()
            .required("username is required")
            .min(6, "username must be at least 6 character"),
        type: Yup.string().required("choose type"),
        phone: Yup.string().required("phone number is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        state: Yup.string().required("state is required"),
        password: Yup.string()
            .required("password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                "Password invalid"
            ),
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const initialState = {
        fullName: "",
        mobile: "",
        type: "",
        email: "",
        state: "",
        address: "",
        contactPerson: "",
    };

    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [customer, setCustomer] = useState(initialState);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const fetchData = async function () {
        try {
            const customer = await fetchCustomerById(props.edit);
            setCustomer(customer);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setCustomer({...customer, [name]: value});
    };

    const updateCustomer = async (e) => {
        e.preventDefault();
        const data = {
            id: props.edit,
            fullName: customer.fullName,
            mobile: customer.mobile,
            type: customer.type,
            email: customer.email,
            state: customer.state,
            address: customer.address,
            contactPerson: customer?.contactPerson,
        };

        const response = await axios.put(config.SOILCARE_API + `/customers`, data, {
            headers: authHeader(),
        });
        if (response.status === 204) {
            setStatus({type: "success", msg: "customer updated successfully"});
            setOpen(true);
        }
    };
    return (
        <>
            <Collapse in={open}>
                {status?.type === "success" && (
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        {status.msg}
                    </Alert>
                )}
            </Collapse>
            {status?.type === "error" && (
                <Alert severity="error" sx={{mb: 2}}>
                    <strong>{status.msg}</strong>
                </Alert>
            )}

            <Card elevation={0} variant='outlined'>
                <CardContent>
                    <form onSubmit={updateCustomer}>
                        <Grid container spacing={3} marginTop="5px">
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={customer?.fullName}
                                    onChange={handleInputChange}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Mobile "
                                    name="mobile"
                                    value={customer?.mobile}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Type"
                                        name="type"
                                        value={customer?.type}
                                        onChange={handleInputChange}
                                        size="small"
                                    >
                                        <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                                        <MenuItem value="GOVT">GOVT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={customer?.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="State"
                                        name="state"
                                        value={customer?.state}
                                        onChange={handleInputChange}
                                        size="small"
                                    >
                                        <MenuItem value="ASSAM">ASSAM</MenuItem>
                                        <MenuItem value="SIKKIM">SIKKIM</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={customer?.address}
                                    onChange={handleInputChange}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Contact person"
                                    name="contactPerson"
                                    variant="outlined"
                                    value={customer?.contactPerson || ""}
                                    onChange={handleInputChange}
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {!isMatch && (
                                        <Button
                                            sx={{mr: 2}}
                                            //onClick={handleReset}
                                            type="submit"
                                            color="error"
                                            variant="contained"
                                            startIcon={<RotateLeftIcon />}
                                            fullWidth={isMatch}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        fullWidth={isMatch}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default EditCustomerForm;
