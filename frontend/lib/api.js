import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const url = config.url || '';
        let token = null;

        if (url.includes('/driver') ||
            url.includes('/bookings/pending') ||
            url.includes('/bookings/driver-history') ||
            (url.includes('/bookings/') && !url.includes('/bookings/create') && !url.includes('/users/'))) {
            token = localStorage.getItem('driverToken');
        } else {
            token = localStorage.getItem('userToken');
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
