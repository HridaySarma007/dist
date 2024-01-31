import {Card, CardContent, Grid, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import config from "../../utils/config";

const CustomerProfile = (props) => {
    const token = JSON.parse(localStorage.getItem("customer_token"));
    const [customer, setCustomer] = useState({});

    const axiosConfig = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };
    const loadCustomers = async () => {
        try {
            const res = await axios.get(
                config.SOILCARE_API + `/customers/${props.id}`, axiosConfig
            );

            setCustomer(res.data.data);
        } catch (error) {
            const statusCode = error.response.status;
            if (statusCode >= 400 && statusCode < 500) {
                navigate("/404");
            } else {
                navigate("/500");
            }
        }
    };
    useEffect(() => {
        loadCustomers();
    }, []);


    return (
        <Card elevation={0} variant='outlined'>
            <CardContent>
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
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CustomerProfile;
