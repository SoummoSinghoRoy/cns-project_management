import { Navigate } from "react-router";
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({children}) => {
  const { authToken } = useAuth();

  if(authToken) {
    return children
  } 
  return <Navigate to="/login" replace/>
};

export default ProtectedRoute;