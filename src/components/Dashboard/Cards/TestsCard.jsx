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
import AssessmentIcon from "@mui/icons-material/Assessment";
import {green} from "@mui/material/colors";
import config from "../../../utils/config";
import authHeader from "../../../utils/auth-header";
import axios from "axios";
import {Link} from "react-router-dom";

const TestsCard = () => {
    const [totalTests, setTotalTests] = useState();
    const fetchTests = async () => {
        const response = await axios.get(config.SOILCARE_API + "/test-results/count/all", {
            headers: authHeader(),
        });

        setTotalTests(response.data.data.farmer);
    };

    useEffect(() => {
        fetchTests();
    }, []);
    return (
        <a href="/reports" style={{textDecoration: "none"}}>
            <Card elevation={0} variant='outlined' sx={{borderTop:`solid 3px ${green[600]}`}}>
                <CardContent>
                    <Grid container spacing={1} sx={{justifyContent: "space-between"}}>
                        <Grid item>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Avatar
                                    sx={{
                                        backgroundColor: green[600],
                                        height: 32,
                                        width: 32,
                                    }}
                                >
                                    <AssessmentIcon />
                                </Avatar>
                                <Typography color="textSecondary" variant="h6" sx={{ml: 2}}>
                                   Farmer Tests
                                </Typography>
                            </div>
                            <Typography color="textPrimary" variant="h4" sx={{mt:1}}>
                                {totalTests}
                            </Typography>
                            <Typography color="textPrimary">
                                AS OF {(new Date()).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </a >
    );
};

export default TestsCard;
