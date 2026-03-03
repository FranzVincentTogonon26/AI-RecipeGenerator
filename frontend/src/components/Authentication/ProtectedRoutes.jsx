import { Navigate } from 'react-router';
import { useAuth } from '../../context/useAuth'

const ProtectedRoutes = ({children}) => {

  const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }
  
  return children;
  
}

export default ProtectedRoutes