import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";

const ProtectedRoute = (props: RouteProps) => {
    const authJson = localStorage.getItem("user");
    
    if(!authJson) {
        return <Navigate to="/auth" />
    }

    return <Outlet/>;
};

export default ProtectedRoute;