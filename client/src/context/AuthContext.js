import React, { createContext, useContext, useState } from 'react';
import { logoutFetcher } from '../fetcher/auth.fetcher';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(sessionStorage.getItem('auth_user') || null);

  const login = (token) => {
    sessionStorage.setItem('auth_user', token);
    setAuthToken(token);
  };

  const logout = async () => {
    const response = await logoutFetcher(authToken);

    if(response.data.statusCode === 200) {
      sessionStorage.removeItem('auth_user')
      return response.data;
    }
  };

  return(
    <AuthContext.Provider value={{authToken, login, logout, setAuthToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);