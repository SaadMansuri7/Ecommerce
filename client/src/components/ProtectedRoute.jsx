import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
    let { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return (<Navigate to="/login" replace />)
    }

    return children;
}