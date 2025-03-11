import {BrowserRouter, Routes, Route} from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utility/ProtectedRoute";
import { Layout } from "./components/Layout";
import { EmployeeRegistration } from "./pages/employee/Registration";
import { AllEmployee } from "./pages/employee/AllEmployee";
import { AllProject } from "./pages/project/AllProject";
import UnProtectedRoute from "./utility/UnProtectedRoute";

function App() {
  return (
    <div className="App">
      <div className="container border border border-2 shadow-lg shadow-md" style={{paddingLeft: "0px", paddingRight: "0px", minHeight: "100vh"}}>
        <AuthProvider>
          <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="signup" element={
                <UnProtectedRoute>
                  <Signup/>
                </UnProtectedRoute>
              }/>
              <Route path="login" element={
                <UnProtectedRoute>
                  <Login/>
                </UnProtectedRoute>
              }/>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }/>
              <Route path="/project" element={
                <ProtectedRoute>
                  <AllProject />
                </ProtectedRoute>
              }/>
              <Route path="employee">
                <Route path="registration" element={
                  <ProtectedRoute>
                    <EmployeeRegistration />
                  </ProtectedRoute>
                }/>
                <Route path="all" element={
                  <ProtectedRoute>
                    <AllEmployee />
                  </ProtectedRoute>
                }/>
              </Route>
            </Routes>
          </Layout>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
