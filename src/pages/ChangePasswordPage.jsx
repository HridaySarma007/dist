import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import ChangePasswordForm from "../components/Users/ChangePasswordForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";

function ChangePasswordPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container>
        {!isMatch && (
          <Breadcrumb items={["Dashboard", "Users", "Change password"]} />
        )}

        <ChangePasswordForm sx = {{marginTop: '30px'}}/>
      </Container>
    </>
  );
}

export default ChangePasswordPage;
