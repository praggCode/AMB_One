'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/common/lib/api';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        if (!api) return;
        try {
            const { data } = await api.get('/users/profile');
            setUser(data);
        } catch (error) {
            if (error.response?.status !== 401) {
                // Ensure no red error overlay on Next.js during interviews for initial fetch
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        if (!api || !api.post) {
            return { success: false, message: "System error: API unavailable" };
        }
        try {
            const { data } = await api.post('/users/login', { email, password });
            if (data.token) {
                localStorage.setItem('userToken', data.token);
            }
            // Refetch user profile to ensure all data is loaded
            await checkUserLoggedIn();
            router.push('/user/dashboard');
            return { success: true };
        } catch (error) {
            if (error.response?.status !== 401) {
                // Ignore console.error to prevent red overlay
            }
            const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        if (!api || !api.post) {
            return { success: false, message: "System error: API unavailable" };
        }
        try {
            const { data } = await api.post('/users/register', userData);
            if (data.token) {
                localStorage.setItem('userToken', data.token);
            }
            // Refetch user profile to ensure all data is loaded
            await checkUserLoggedIn();
            router.push('/user/dashboard');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.error || (error.response?.data?.errors ? error.response.data.errors[0].msg : 'Registration failed');
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
            setUser(null);
            localStorage.removeItem('userToken');
            router.push('/login');
        } catch (error) {
            // Ignore console.error
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
