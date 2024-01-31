import React, {useState, useEffect} from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import EditCustomerForm from "../components/Customers/EditCustomerForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import {useParams} from "react-router-dom";
import {fetchCustomerById} from "../api";

function EditCustomer() {
    const token = JSON.parse(localStorage.getItem("token"));
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const {id} = useParams();
    const [customer, setCustomer] = useState([]);

    const config = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const fetchData = async function () {
        try {
            const customer = await fetchCustomerById(id);
            setCustomer(customer);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Container>
                <Breadcrumb items={["Dashboard", "Customers", "Edit customer"]} />
                <EditCustomerForm edit={id} customer={customer} />
            </Container>
        </>
    );
}

export default EditCustomer;
