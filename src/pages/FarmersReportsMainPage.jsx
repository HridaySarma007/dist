import React from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import FarmerReportsMobile from "../components/TestReports/FarmerReportsMobile";
import FarmerReports from "../components/TestReports/FarmerReports";
import Container from "../components/Container";


const FarmersReportsMainPage = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {isMatch ? (
                <FarmerReportsMobile />
            ) : (
                <Container>
                    <FarmerReports />
                </Container>
            )}
        </>
    );
};

export default FarmersReportsMainPage;
