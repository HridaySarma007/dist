import {Box, Card, CardContent, Chip, Grid, Switch, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import authHeader from "../../utils/auth-header";
import config from "../../utils/config";

const ViewCustomer = (props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const loadUsers = async () => {
        try {
            const res = await axios.get(config.SOILCARE_API + `/users/${props.id}`, {
                headers: authHeader(),
            });
            let user = res.data.data
            setUser(user);
            setChecked(user.isActive);
        } catch (error) {
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [checked]);

    const changeStatus = async (state) => {
        await axios.patch(
            config.SOILCARE_API + `/users/${props.id}/is-active`,
            {status: state},
            {headers: authHeader()}
        );
        setChecked(state)
    };

    function onChechkboxChange(e) {
        let status = e.target.checked;
        changeStatus(status)
    }

    return (
        <Card elevation={0} variant='outlined'>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>Name:</b></Typography>
                            <Typography>{user.name}</Typography>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>Username:</b></Typography>
                            <Typography>{user.username}</Typography>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>Email:</b></Typography>
                            <Typography>{user.email}</Typography>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>Role:</b></Typography>
                            <Typography>{user.role}</Typography>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>State:</b></Typography>
                            <Typography>{user.state}</Typography>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Typography sx={{width: "150px"}}><b>Status:</b></Typography>
                            <Typography><Chip color={user.isActive ? 'success' : 'error'} label={user.isActive ? 'Active' : 'Blocked'} /></Typography>
                        </div>
                    </Grid>
                </Grid>

                <Box sx={{mt: 2}}>
                    <span>Change User Status</span>
                    <Switch onChange={onChechkboxChange} checked={checked} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ViewCustomer;
