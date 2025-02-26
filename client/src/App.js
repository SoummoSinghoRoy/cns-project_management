import Signup from "./pages/auth/Signup";
import {BrowserRouter, Routes, Route} from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} index/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
