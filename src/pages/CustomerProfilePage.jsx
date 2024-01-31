import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import CustomerProfile from "../components/CustomerReports/CustomerProfile";

function CustomerProfilePage() {
  const customer = JSON.parse(localStorage.getItem("customer"));

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (

      <Container>
        <Breadcrumb items={["Customer-Dashboard", "Profile"]} />
        <CustomerProfile id={customer.id} />
      </Container>
  );
}

export default CustomerProfilePage;
