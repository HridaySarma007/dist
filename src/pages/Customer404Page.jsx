import React from "react";
import { useMediaQuery, useTheme, Button } from "@mui/material";
import Navbar from "../components/Navbar/CustomerNavbar";
import MobileNavbar from "../components/Navbar/CustomerMobileNavbar";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import NotFound from "../../Images/404.png";

const Customer404Page = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isMatch ? <MobileNavbar title="404" /> : <Navbar />}

      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={NotFound} height="300px" width="200px" />
          <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
            The resource you are looking for is no longer available
          </p>
          <Link to="/customer-dashboard" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained">
              GO TO DASHBOARD
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Customer404Page;
