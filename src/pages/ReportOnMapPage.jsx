import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import ReportOnMap from "../components/TestReports/ReportOnMap";
import Container from "../components/Container";
function ReportDetailsPage(props) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isMatch ? <MobileNavbar title="Map" /> : <Navbar />}
      <Container>
        <ReportOnMap data={[props?.state?.data]} />
      </Container>
    </>
  );
}

export default ReportDetailsPage;
