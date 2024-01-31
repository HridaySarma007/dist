import React from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard";
import Container from "../components/Container";

const CustomerDashboardPage = () => {
    return (
            <Container>
                <CustomerDashboard />
            </Container>
    );
};

export default CustomerDashboardPage;
