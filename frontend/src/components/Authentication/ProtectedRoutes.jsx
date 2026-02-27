import { Navigate } from 'react-router';
import { useAuth } from '../../context/useAuth'
import { Loader2Icon } from 'lucide-react'

const ProtectedRoutes = ({children}) => {

  const { loading, isAuthenticated } = useAuth();

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className='size-6 animate-spin' />
      </div>
    )
  }

  if(isAuthenticated){
    return <Navigate to='/login' replace />
  }
  
  return children;
  
}

export default ProtectedRoutes