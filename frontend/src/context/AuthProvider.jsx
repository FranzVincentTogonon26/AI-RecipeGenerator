import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if(token && user){
                setUser(JSON.parse(user));
                setIsAuthenticated(true);
            }

        } catch (error) {
            console.log('Failed check Authentication:', error);
            logout();
        } finally {
            setLoading(false)
        }
    }
    checkAuthStatus();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location = '/';
  }

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  }

const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout
}

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
