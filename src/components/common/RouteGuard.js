import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthDataContext } from "../../contexts/AuthContext";

export const RouteGuard = ({
    children,
}) => {
    const { isAuth } = useContext(AuthDataContext);
    
    if (!isAuth) {
        return alert('Please login first')
    }

    return children ? children : <Outlet />
};
