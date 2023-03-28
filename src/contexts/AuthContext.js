import { useState,createContext } from 'react';
import Cookies from 'js-cookie';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthDataContext = createContext();



export const AuthProvider = ({
    children,
}) => {

    const [userData, setUserData] = useLocalStorage('userData', {});
    const [csrfToken, setCsrfToken] = useState(Cookies.get('csrftoken'));
  
  
    const userLogin = (authData) => {
      setUserData(authData);
    }
  
    const userLogout = () => {
      setUserData({})
    }

    const contextValues = {
      userData, 
      userLogin, 
      userLogout, 
      csrfToken, 
      isStaff: userData.isStaff,
      isAuth: userData.token? true : false
    }

    return (
        <AuthDataContext.Provider value={contextValues}>
            {children}
        </AuthDataContext.Provider>
    );
}
