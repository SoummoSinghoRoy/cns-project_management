import Signup from "./pages/auth/Signup";
import {BrowserRouter, Routes, Route} from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="signup" element={<Signup/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
