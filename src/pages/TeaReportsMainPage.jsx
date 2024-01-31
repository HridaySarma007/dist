import React from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import TeaReportsMobile from "../components/TestReports/TeaReportsMobile";
import TeaReports from "../components/TestReports/TeaReports";
import Container from "../components/Container";


const TeaReportsMainPage = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {isMatch ? (
                <TeaReportsMobile />
            ) : (
                <Container>
                    <TeaReports />
                </Container>
            )}
        </>
    );
};

export default TeaReportsMainPage;
