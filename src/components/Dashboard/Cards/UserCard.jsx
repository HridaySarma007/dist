import React, {useState, useEffect} from "react";
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import {yellow} from "@mui/material/colors";
import config from "../../../utils/config";
import authHeader from "../../../utils/auth-header";
import axios from "axios";
import {Link} from "react-router-dom";

const UserCard = () => {
    const [totalUsers, setTotalUsers] = useState(undefined);

    const fetchUsers = async () => {
        const response = await axios.get(config.SOILCARE_API + "/users", {
            headers: authHeader(),
        });
        setTotalUsers(response.data.data.length);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <a href="/users" style={{textDecoration: "none"}}>
            <Card elevation={0} variant="outlined" sx={{borderTop:`solid 3px ${yellow[600]}`}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Avatar
                                    sx={{
                                        backgroundColor: yellow[600],
                                        height: 32,
                                        width: 32,
                                    }}
                                >
                                    <PeopleIcon />
                                </Avatar>
                                <Typography sx={{ml: 2}} color="textSecondary" variant="h6">
                                    Users
                                </Typography>
                            </div>
                            <Typography color="textPrimary" variant="h4" sx={{mt:1}}>
                                {totalUsers}
                            </Typography>
                            <Typography>
                                AS OF {(new Date()).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </a>
    );
};

export default UserCard;
