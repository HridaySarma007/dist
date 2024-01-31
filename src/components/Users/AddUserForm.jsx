import React, {useState, useEffect} from "react";
import {
    Box,
    Button,
    useMediaQuery,
    useTheme,
    Grid,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Alert,
    IconButton,
    Collapse,
    Card,
    CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../utils/index";
import axios from "axios";

const AddUserForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string()
            .required("username is required")
            .min(6, "username must be at least 6 character"),
        role: Yup.string().required("choose role"),
        phone: Yup.string().required("phone number is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        state: Yup.string().required("state is required"),
        password: Yup.string()
            .required("password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                "Password must have atleast one uppercase,lowercase,number and special character"
            ),
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [states, setStates] = useState([]);

    const fetchStates = async () => {
        const res = await axios.get("https://address.ttsec.co.in/states");
        setStates(res.data);
    };

    console.log(states);

    useEffect(() => {
        fetchStates();
    }, []);

    const config = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const onSubmit = async (data) => {
        console.log(JSON.stringify(data, null, 2));
        try {
            const res = await api.post("users", JSON.stringify(data), config);
            if (res.status === 201) {
                setStatus({type: "success", msg: "user created successfully"});
                setOpen(true);
            }
            console.log(res);
        } catch (error) {
            if (error.response) {
                setStatus({type: "error", msg: error.response.data.error.details});
            }
        }
    };

    const handleChange = (event) => {
        /* setValues({
          ...values,
          [event.target.name]: event.target.value
        });*/
    };

    const handleReset = () => {
        reset();
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

            <Card elevation={0} variant='outlined' sx={{mb:4}}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    {...register("name")}
                                    error={errors.name ? true : false}
                                    helperText={errors.name?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    {...register("username")}
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Role"
                                        name="role"
                                        {...register("role")}
                                        error={errors.role ? true : false}
                                        helperText={errors.role?.message}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                                        <MenuItem value="AGENT">AGENT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    {...register("phone")}
                                    error={errors.phone ? true : false}
                                    helperText={errors.phone?.message}
                                    type="number"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="dropdown"
                                        label="State"
                                        name="state"
                                        {...register("state")}
                                        error={errors.state ? true : false}
                                        helperText={errors.state?.message}
                                    >
                                        {states.map((state) => (
                                            <MenuItem value={state.name}>{state.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    {...register("password")}
                                    error={errors.password ? true : false}
                                    helperText={errors.password?.message}
                                    variant="outlined"
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
                                            type="reset"
                                            color="error"
                                            variant="contained"
                                            startIcon={<RotateLeftIcon />}
                                            fullWidth={isMatch}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                    <Button
                                        // onClick={handleSubmit(onSubmit)}
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

export default AddUserForm;
