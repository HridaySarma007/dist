import React from "react";
import {Navigate, useLocation, Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/CustomerNavbar";
import Nav from '../components/Navbar/CustomerNavbar';

export const getToken = () => {
    return localStorage.getItem("customer_token") || null;
};

export const isCustomer = () => {
    let customer = localStorage.getItem("customer") || null;

    return customer.type && (customer.type === "GOVT" || customer.type === "INDIVIDUAL");
};

function CustomerRoute() {
    const location = useLocation();
    return (
        getToken() && !isCustomer() ? (
            <>
                <Navbar />
                <Outlet />
            </>
        ) : (
            <Navigate to="/customer-login" state={{from: location}} />
        )
    )
}

export default CustomerRoute;
