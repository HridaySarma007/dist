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
import {fetchUserById} from "../../api";
import authHeader from "../../utils/auth-header";
import ApiErrorHandler from "../../utils/ApiErrorHandler";

const EditUserForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        role: Yup.string()
            .required("role is required"),
        phone: Yup.string().required("phone number is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        state: Yup.string().required("state is required")
    });

    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const initialState = {
        name: "",
        role: "",
        phone: "",
        email: "",
        state: ""
    };

    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(initialState);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const fetchData = async function () {
        try {
            const user = await fetchUserById(props.edit);
            setUser(user);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const updateUser = async (e) => {
        e.preventDefault();
        const data = {
            id: props.edit,
            name: user.name,
            role: user.role,
            phone: user.phone,
            email: user.email,
            state: user.state,
        };

        const response = await axios.put(config.SOILCARE_API + `/users/${props.edit}`, data, {
            headers: authHeader(),
        });
        if (response.status === 204) {
            setStatus({type: "success", msg: "user updated successfully"});
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
                    <form onSubmit={updateUser}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={user?.name || ""}
                                    onChange={handleInputChange}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Role"
                                        name="role"
                                        value={user?.role || ""}
                                        onChange={handleInputChange}
                                        size="small"
                                    >
                                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                                        <MenuItem value="AGENT">AGENT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={user?.phone || ""}
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
                                        value={user?.state || ""}
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
                                    label="Email"
                                    name="email"
                                    value={user?.email || ""}
                                    onChange={handleInputChange}
                                    type="text"
                                    variant="outlined"
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
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        fullWidth={isMatch}
                                    >
                                        Save Changes
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

export default EditUserForm;
