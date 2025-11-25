'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/api';
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
        try {
            const { data } = await api.get('/users/profile');
            setUser(data.user);
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Not logged in", error);
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/users/login', { email, password });
            setUser(data.user);
            router.push('/dashboard');
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/users/register', userData);
            setUser(data.user);
            router.push('/dashboard');
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            const message = error.response?.data?.message || error.response?.data?.error || (error.response?.data?.errors ? error.response.data.errors[0].msg : 'Registration failed');
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
