import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => response, (error) => {
    const status = error.response ? error.response.status : null;
    const errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;

    if (status === 401 && (errorMessage === 'Unauthorized Access, No token provided!' || errorMessage === 'Invalid token' || errorMessage === 'jwt expired')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});