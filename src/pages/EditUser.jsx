import React from "react";
import EditUserForm from "../components/Users/EditUserForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import { useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();

  return (
    <>
      <Container>
        <Breadcrumb items={["Dashboard", "Users", "Edit user"]} />
        <EditUserForm edit={id} />
      </Container>
    </>
  );
}

export default EditUser;
