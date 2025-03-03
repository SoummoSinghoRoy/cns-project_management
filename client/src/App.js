import Signup from "./pages/auth/Signup";
import {BrowserRouter, Routes, Route} from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utility/ProtectedRoute";
import { Layout } from "./components/Layout";
import { EmployeeRegistration } from "./pages/employee/Registration";

function App() {
  return (
    <div className="App">
      <AuthProvider>
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
            <Route path="/registration" element={
              <ProtectedRoute>
                <EmployeeRegistration />
              </ProtectedRoute>
            } />
          </Routes>
         </Layout>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
