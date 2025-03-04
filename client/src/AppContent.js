import React, {useEffect} from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import ProtectedRoute from './utility/ProtectedRoute';
import { Home } from './pages/Home';
import { EmployeeRegistration } from "./pages/employee/Registration";
import { useAuth } from "./context/AuthContext";

export function AppContent() {
   const {authToken} = useAuth();
  
    useEffect(() => {
      if(authToken) {
        document.body.classList.add = `auth-bg`
      }else {
        document.body.classList.remove('authenticated-bg');
      }
    }, [authToken]);

  return(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="employee">
            <Route path="registration" element={
              <ProtectedRoute>
                <EmployeeRegistration />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}