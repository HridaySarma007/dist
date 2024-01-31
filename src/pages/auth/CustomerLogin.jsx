import LoadingButton from "@mui/lab/LoadingButton";
import {
    Alert, Grid, Snackbar, TextField, Typography, Card, CardContent
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import config from "../../utils/config";

function CustomerLogin() {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackBarOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState(undefined);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [loading, setLoading] = useState(false);

    const onChangePhone = (e) => {
        const phoneNumber = e.target.value;
        setPhone(phoneNumber);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        //loading(true);
        try {
            setLoading(true);
            const res = await axios.post(config.SOILCARE_API + "/auth/customers", {
                mobile: phone,
            });

            setTimeRemaining(res.data.timeRemaining);

            setLoading(false);

            navigate(
                "/otp-verification",
                {
                    state: {
                        mobile: phone,
                        time: timeRemaining,
                    },
                });
        } catch (error) {
            setMsg(error.response.data.error.details);
            setSnackBarOpen(true);
            setLoading(false);
            return;
        }
    };

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
                <Typography variant='h3'>Sign In</Typography>
                <Grid container spacing={0} sx={{mt:3}}>
                    <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
                    <Grid item xs={10} sm={6} md={6} lg={4}>
                        <form onSubmit={handleLogin}>
                            <div style={{marginBottom: 20}}>
                                <Typography color='textSecondary' sx={{my: 2}}>An OTP will be sent to your mobile number for verification</Typography>
                                <TextField
                                    id="outlined-required"
                                    fullWidth
                                    name="phone"
                                    type="text"
                                    value={phone}
                                    onChange={onChangePhone}
                                    label="Enter your phone number"
                                    size="small"
                                />
                            </div>

                            <div style={{marginTop: 20}}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    disableElevation
                                    fullWidth
                                    loading={loading}
                                    loadingPosition="start"
                                >
                                    <b>GET OTP</b>
                                </LoadingButton>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
                </Grid>
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

export default CustomerLogin;
