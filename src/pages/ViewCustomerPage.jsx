import React from "react";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import ViewCustomer from "../components/Customers/ViewCustomer";
import {useParams} from "react-router-dom";

function ViewCustomerPage() {
    const {id} = useParams();
    return (
        <>
            <Container>
                <Breadcrumb items={["Dashboard", "Customers", "View customer"]} />
                <ViewCustomer id={id} />
            </Container>
        </>
    );
}

export default ViewCustomerPage;
