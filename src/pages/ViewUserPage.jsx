import React from "react";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import ViewUser from "../components/Users/ViewUser";
import { useParams } from "react-router-dom";

function ViewCustomerPage() {
  const { id } = useParams();
  return (
      <Container>
        <Breadcrumb items={["Dashboard", "Users", "View user"]} />
        <ViewUser id={id} />
      </Container>
  );
}

export default ViewCustomerPage;
