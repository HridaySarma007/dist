import React from "react";
import { useMediaQuery, useTheme, Button } from "@mui/material";
import Navbar from "../components/Navbar/CustomerNavbar";
import MobileNavbar from "../components/Navbar/CustomerMobileNavbar";
import { Link } from "react-router-dom";
import Container from "../components/Container";


const Customer500Page = () => {
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
          <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
            Internal Server Error
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

export default Customer500Page;
