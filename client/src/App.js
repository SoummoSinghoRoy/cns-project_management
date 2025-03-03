import Signup from "./pages/auth/Signup";
import {BrowserRouter, Routes, Route} from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";

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
          </Routes>
         </Layout>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
