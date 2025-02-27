import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

  const login = (token) => {
    sessionStorage.setItem('auth_user', token);
    setAuthToken(token);
  };

  const logout = () => {};

  return(
    <AuthContext.Provider value={{authToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);