import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 8000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    
);

// Resposne Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href='/login'
        }
    }
);

export default axiosInstance;