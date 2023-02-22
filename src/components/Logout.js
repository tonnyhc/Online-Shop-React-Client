import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { AuthDataContext } from "../contexts/AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { userData, userLogout } = useContext(AuthDataContext);
    logout(userData.token)
        .then(() => {
            userLogout();
            navigate('/');
        })


    return null;

}