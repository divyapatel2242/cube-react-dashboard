import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "./Auth";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            const authStatus = true;//await checkAuthentication();
            setIsAuthenticated(authStatus);
        };
        authenticate();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
