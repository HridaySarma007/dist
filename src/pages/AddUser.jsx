import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import AddUserForm from "../components/Users/AddUserForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";

function AddUser() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (

      <Container>
        <Breadcrumb items={["Dashboard", "Users", "Add user"]} />
        <AddUserForm />
      </Container>
  );
}

export default AddUser;
