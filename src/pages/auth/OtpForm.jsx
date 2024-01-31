import {yupResolver} from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Alert, Grid, Snackbar, TextField, Typography
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useLocation} from "react-router-dom";
import * as Yup from "yup";
import config from "../../utils/config";

function OtpForm(props) {
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required("This field is required"),
    });
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();
    const location = useLocation()

    const phoneNumber = location.state.mobile;
    // console.log(phoneNumber);
    const timeRemaining = location.state.time;
    // console.log(timeRemaining);

    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState(undefined);
    const [snackbarOpen, setSnackBarOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const fieldData = {
            mobile: phoneNumber,
            token: data.otp,
        };

        try {
            setLoading(true);
            const res = await axios.post(
                config.SOILCARE_API + "/auth/customers/verify-otp",
                fieldData
            );
            console.log(res.data.data);
            setLoading(false);
            const store = {
                customer: res.data.data.profile,
                token: res.data.data.accessToken,
            };
            window.localStorage.setItem("customer", JSON.stringify(store.customer));
            window.localStorage.setItem(
                "customer_token",
                JSON.stringify(store.token)
            );
            if (res.status === 200) {
                navigate("/customer-dashboard", {replace: true});
            }
        } catch (error) {
            console.log(error);
            setMsg(error.response.data?.error?.details);
            setSnackBarOpen(true);
            setLoading(false);
            return;
        }
    };

    const [counter, setCounter] = React.useState(150);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <Typography variant='h3'>Verify OTP</Typography>
                <Grid container spacing={0} sx={{mt:3}}>
                    <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
                    <Grid item xs={10} sm={6} md={6} lg={4}>
                        <Typography color='textSecondary' sx={{my:2}}>Please enter the OTP sent to your mobile number</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{marginBottom: 20}}>
                                <TextField
                                    id="outlined-required"
                                    fullWidth
                                    label="Enter 6 digit OTP"
                                    size="small"
                                    name="otp"
                                    {...register("otp")}
                                    error={errors.otp ? true : false}
                                    helperText={errors.otp?.message}
                                />
                            </div>

                            <div style={{marginTop: 20}}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    disableElevation
                                    fullWidth
                                    loading={loading}
                                >
                                    <b>VERIFY</b>
                                </LoadingButton>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
                </Grid>
                {/* <p style={{ color: "#424242", fontSize: "15px" }}>
          Resend OTP in 00:{timeRemaining}
        </p>
        {counter > 0 ? (
          <Link style={{ pointerEvents: "none", color: "black" }}>
            Resend otp
          </Link>
        ) : (
          <Link onClick={() => alert("clicked")}>Resend otp</Link>
        )}*/}
            </div>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackBarOpen(false)}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert severity="error">{msg}</Alert>
            </Snackbar>
        </>
    );
}

export default OtpForm;
