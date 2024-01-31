import React, {useState} from "react";
import Login from "../../components/Login";
import {Snackbar, Alert, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/actions/authAction";
import logo from "../../../Images/logo.svg";

export default function LoginIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {message} = useSelector((state) => state.message);
    const [snackbarOpen, setSnackBarOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (value) => {
        if (value.username.length === 0 || value.password.length === 0) {
            setMsg("Please enter username and password");
            setSnackBarOpen(true);
            return;
        }
        setSubmitting(true);
        dispatch(login(value.username, value.password)).then(() => {
            navigate("/dashboard", {replace: true});
            setSubmitting(false);
        });
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
                {message && (
                    <Alert severity="error">
                        <strong>{message}</strong>
                    </Alert>
                )}
                <img src={logo} height="80px" alt='Soil Care' style={{marginTop:"-50px", marginBottom:"50px"}}/>
                <Typography
                    variant="h4"
                    textAlign="center"
                    style={{display: "block", marginBottom: "40px"}}
                >
                    Sign In
                </Typography>
                <Login onSubmit={(v) => onSubmit(v)} loading={submitting} />
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
