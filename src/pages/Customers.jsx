import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import CustomersTable from "../components/Customers/CustomersTable";
import CustomersListMobile from "../components/Customers/CustomersListMobile";
import Container from "../components/Container";

const Customers = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isMatch ? (
        <CustomersListMobile />
      ) : (
        <Container>
          <CustomersTable />
        </Container>
      )}
    </>
  );
};

export default Customers;
