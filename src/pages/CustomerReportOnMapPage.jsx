import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar/CustomerNavbar";
import MobileNavbar from "../components/Navbar/CustomerMobileNavbar";
import ReportOnMap from "../components/CustomerReports/CustomerReportOnMap";
import Container from "../components/Container";
function ReportDetailsPage(props) {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMatch ? <MobileNavbar title="Map" /> : <Navbar />}
      <Container>
        <ReportOnMap data={[props?.location?.state?.data]} />
      </Container>
    </>
  );
}

export default ReportDetailsPage;
