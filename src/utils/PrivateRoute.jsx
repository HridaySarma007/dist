import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Navbar/Navbar";

export const getToken = () => {
    return localStorage.getItem("token") || null;
};

function PrivateRoute() {
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const isUser = () => user?.role && (user?.role === "SUPER_USER" || user?.role === "ADMIN")

    return (
        getToken() && isUser() ? (
            <>
                <Header />
                <Outlet />
            </>
        ) : (
            <Navigate to="/login" state={{ from: location }} />
        )
    );
}

export default PrivateRoute;
