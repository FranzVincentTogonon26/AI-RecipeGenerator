import { BrowserRouter, Navigate, Route, Routes } from 'react-router'  
import { Toaster } from "react-hot-toast";

import { AuthProvider } from './context/AuthProvider'  
import ProtectedRoutes from './components/Authentication/ProtectedRoutes'

import LoginPage from './components/Authentication/LoginPage'
import RegisterPage from './components/Authentication/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PantryPage from './pages/PantryPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={ <LoginPage  /> } />
          <Route path='/register' element={ <RegisterPage /> } />
  
          {/* Protected Routes */}
          <Route path='/dashboard' element={ <ProtectedRoutes><DashboardPage /></ProtectedRoutes> } />
          <Route path='/pantry' element={ <ProtectedRoutes><PantryPage /></ProtectedRoutes> } />

          {/* Default redirect to dashboard */}
          <Route path='/' element={ <Navigate to='/dashboard' replace /> } />
  
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{duration: 3000}} />
    </AuthProvider>
  )
}

export default App
