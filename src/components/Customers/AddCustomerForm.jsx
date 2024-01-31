import React, {useEffect, useState} from "react";
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
    Card, CardContent
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../utils/index";
import config from "../../utils/config";
import axios from "axios";
import {useSelector} from "react-redux";

const AddCustomerForm = () => {
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("FullName is required"),
        mobile: Yup.string()
            .required("Mobile number is required")
            .min(10, "Mobile number must be 10 digits")
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Mobile number is invalid"
            ),
        type: Yup.string().required("Type is required"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        state: Yup.string().required("State is required"),
        address: Yup.string().required("Address is required"),
    });

    const token = JSON.parse(localStorage.getItem("token"));
    //const { states } = useSelector((state) => state);
    //console.log(states);
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState(undefined);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedValue, setSelectedValue] = useState();
    const [states, setStates] = useState([]);

    const fetchStates = async () => {
        const res = await axios.get("https://address.ttsec.co.in/states");

        setStates(res.data);
    };

    useEffect(() => {
        fetchStates();
    }, []);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const config = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await api.post("customers", JSON.stringify(data), config);
            if (res.status === 201) {
                setStatus({type: "success", msg: "customer added successfully"});
                setOpen(true);
            }
            console.log(res);
        } catch (error) {
            console.log(error.response.data.error.details);
            if (error.response) {
                setStatus({type: "error", msg: error.response.data.error.details});
            }
        }
    };

    const selectHandler = (e) => {
        setSelectedValue(e.target.value);
    };

    function showTextField() {
        return (
            selectedValue === "GOVT" && (
                <TextField
                    fullWidth
                    size="small"
                    label="Contact person "
                    name="contactPerson"
                    {...register("contactPerson")}
                />
            )
        );
    }

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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Full Name"
                                    name="fullName"
                                    {...register("fullName")}
                                    error={errors.fullName ? true : false}
                                    helperText={errors.fullName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Mobile "
                                    name="mobile"
                                    {...register("mobile")}
                                    error={errors.mobile ? true : false}
                                    helperText={errors.mobile?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="dropdown"
                                        label="Type"
                                        name="type"
                                        {...register("type")}
                                        error={errors.type ? true : false}
                                        helperText={errors.type?.message}
                                        onChange={selectHandler}
                                    >
                                        <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                                        <MenuItem value="GOVT">GOVT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Email"
                                    name="email"
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
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
                                    //onChange={selectHandler}
                                    >
                                        {states.map((state) => (
                                            <MenuItem value={state.name}>{state.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Address"
                                    name="address"
                                    type="text"
                                    {...register("address")}
                                    error={errors.address ? true : false}
                                    helperText={errors.address?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                {showTextField()}
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

export default AddCustomerForm;
