import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import AddCustomerForm from "../components/Customers/AddCustomerForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";

function AddCustomer() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container>
        {!isMatch && (
          <Breadcrumb items={["Dashboard", "Customers", "Add customer"]} />
        )}
        <AddCustomerForm />
      </Container>
      {/*<Footer /> */}
    </>
  );
}

export default AddCustomer;
