import {
    Card,
    CardContent, Chip, Grid, Switch, Typography
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import authHeader from "../../utils/auth-header";
import config from "../../utils/config";

const ViewCustomer = (props) => {
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const loadCustomer = async () => {
        try {
            const res = await axios.get(
                config.SOILCARE_API + `/customers/${props.id}`,
                {headers: authHeader()}
            );
            let customer = res.data.data
            setCustomer(customer);
            setChecked(customer.isActive)
        } catch (error) {
            console.log(error);
            ApiErrorHandler(error, navigate);
        }
    };
    useEffect(() => {
        loadCustomer();
    }, [checked]);


    const changeStatus = async (state) => {
        await axios.patch(
            config.SOILCARE_API + `/customers/${props.id}/is-active`,
            {isActive: state},
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

                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Name:</b></Typography>
                                <Typography>{customer.fullName}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Mobile:</b></Typography>
                                <Typography>{customer.mobile}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Customer Type:</b></Typography>
                                <Typography>{customer.type}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Status:</b></Typography>
                                <Typography><Chip color={customer.isActive ? 'success' : 'error'} label={customer.isActive ? 'Active' : 'Blocked'} /></Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Email:</b></Typography>
                                <Typography>{customer.email}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>State:</b></Typography>
                                <Typography>{customer.state}</Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Typography sx={{width: "150px"}}><b>Address:</b></Typography>
                                <Typography>{customer.address}</Typography>
                            </div>
                        </Grid>
                        {customer?.contactPerson && (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{width: "150px"}}><b>Contact Person:</b></Typography>
                                    <Typography>{customer.contactPerson}</Typography>
                                </div>
                            </Grid>
                        )}
                        <Grid item lg={12}>
                            <div>
                                <b>Change Customer Status</b>
                                <Switch onChange={onChechkboxChange} checked={checked} />
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ViewCustomer;
