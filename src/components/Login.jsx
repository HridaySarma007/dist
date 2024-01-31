import React, {useState} from "react";
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Login = ({onSubmit, loading}) => {
    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [showPassword, setShowPassword] = useState(
        passwordFieldType !== "password"
    );

    function handleShowPassword() {
        console.log(passwordFieldType);
        showPassword
            ? setPasswordFieldType("text")
            : setPasswordFieldType("password");
        setShowPassword(!showPassword);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = {
            username: data.get("username"),
            password: data.get("password"),
        };
        onSubmit(value);
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
            <Grid item xs={10} sm={6} md={6} lg={4}>
                <form
                    onSubmit={(e) => onSubmitHandler(e)}
                    method="post"
                    style={{width: "100%"}}
                >
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={{marginBottom: "20px"}}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{marginBottom: "20px"}}
                    >
                        <InputLabel htmlFor="filled-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            label="Password"
                            id="filled-adornment-password"
                            name="password"
                            type={passwordFieldType}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => handleShowPassword()}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        type="submit"
                        loading={loading}
                        loadingPosition="start"
                        disableElevation
                    >
                        {" "}
                        <b>Login</b>
                    </LoadingButton>
                </form>
            </Grid>
            <Grid item xs={1} sm={3} md={3} lg={4}></Grid>
        </Grid>
    );
};

export default Login;
