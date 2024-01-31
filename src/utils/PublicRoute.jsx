import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from '../components/NavPublic';

export const getToken = () => {
    return localStorage.getItem("token") || null;
};
//wrapper
function PublicRoute() {
    return (
        !getToken() ? (
            <>
                <Header />
                <Outlet />
            </>
        ) : (
            <Navigate to={{ pathname: "/dashboard" }} />
        )
    )
}

export default PublicRoute;
