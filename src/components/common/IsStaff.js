import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthDataContext } from "../../contexts/AuthContext";

export const IsStaff = ({
    children
}) => {
    const {isStaff} = useContext(AuthDataContext);

    if (!isStaff){
        return <Navigate to='/' replace/>
    };

    return children ? children : <Outlet />

};