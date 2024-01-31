import React, {useState, useEffect} from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {red} from "@mui/material/colors";
import config from "../../../utils/config";
import authHeader from "../../../utils/auth-header";
import axios from "axios";
import {Link} from "react-router-dom";

const CustomerCard = () => {
    const [totalCustomers, setTotalCustomers] = useState();
    const fetchCustomers = async () => {
        const res = await axios.get(config.SOILCARE_API + "/customers", {
            headers: authHeader(),
        });

        setTotalCustomers(res.data.totalResult);
    };
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <a href="/customers" style={{textDecoration: "none"}}>
            <Card elevation={0} variant='outlined' sx={{borderTop:`solid 3px ${red[600]}`}}> 
                <CardContent>
                    <Grid container spacing={1} sx={{justifyContent: "space-between"}}>
                        <Grid item>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Avatar
                                    sx={{
                                        backgroundColor: red[600],
                                        height: 32,
                                        width: 32,
                                    }}
                                >
                                    <GroupAddIcon />
                                </Avatar>
                                <Typography color="textSecondary" variant="h6" sx={{ml:2}}>
                                    Customers
                                </Typography>
                            </div>
                            <Typography color="textPrimary" variant="h4" sx={{mt:1}}>
                                {totalCustomers}
                            </Typography>
                            <Typography color="textPrimary">
                               AS OF {(new Date().toLocaleDateString())}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </a>
    );
};

export default CustomerCard;
