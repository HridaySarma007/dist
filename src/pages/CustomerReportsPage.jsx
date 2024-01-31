import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import MobileNavbar from "../components/Navbar/CustomerMobileNavbar";
import Navbar from "../components/Navbar/CustomerNavbar";
import ReportsMobile from "../components/CustomerReports/CustomerReportsMobile";
import Reports from "../components/CustomerReports/CustomerReports";
import Container from "../components/Container";

const CustomerReportsPage = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container>
            <Reports />
        </Container>
    );
};

export default CustomerReportsPage;
