import { Navigate } from "react-router";
import { useAuth } from '../context/AuthContext';

const UnProtectedRoute = ({children}) => {
  const { authToken } = useAuth();

  if(!authToken) {
    return children
  } 
  return <Navigate to="/" replace/>
};

export default UnProtectedRoute;