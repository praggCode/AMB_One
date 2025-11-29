import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Backend runs on port 4000
    withCredentials: true, // Important for cookies
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

        // Determine which token to use based on the URL
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
