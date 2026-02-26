import axiosInstance from '../libs/axiosInstance'
import { API_PATHS } from '../libs/apiPaths'

const login = () => {
    try {
        
    } catch (error) {
        throw error.response?.data || { message: 'Aninknown error occur' }
    }
}

const register = () => {
    try {
        
    } catch (error) {
        throw error.response?.data || { message: 'Aninknown error occur' }
    }
}

const authService = {
    login,
    register
}

export default authService;