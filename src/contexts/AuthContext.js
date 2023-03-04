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

    return (
        <AuthDataContext.Provider value={{ userData, userLogin, userLogout, csrfToken }}>
            {children}
        </AuthDataContext.Provider>
    );
}
