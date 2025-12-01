'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkDriverLoggedIn();
    }, []);

    const checkDriverLoggedIn = async () => {
        try {
            const { data } = await api.get('/driver/profile');
            setDriver(data);
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Driver not logged in", error);
            }
            setDriver(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/driver/login', { email, password });
            setDriver(data.driver);
            if (data.token) {
                localStorage.setItem('driverToken', data.token);
            }
            router.push('/DriverPages'); // Adjust route
            return { success: true };
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Login failed", error);
            }
            const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
            return { success: false, message };
        }
    };

    const register = async (driverData) => {
        try {
            const { data } = await api.post('/driver/register', driverData);
            setDriver(data.driver);
            if (data.token) {
                localStorage.setItem('driverToken', data.token);
            }
            router.push('/DriverPages');
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            const message = error.response?.data?.message || error.response?.data?.error || (error.response?.data?.errors ? error.response.data.errors[0].msg : 'Registration failed');
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await api.post('/driver/logout');
            setDriver(null);
            localStorage.removeItem('driverToken');
            router.push('/login?role=driver');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const updateStatus = async (status) => {
        try {
            const { data } = await api.put('/driver/status', { status });
            setDriver(data.driver);
            return { success: true };
        } catch (error) {
            console.error("Update status failed", error);
            return { success: false, message: error.response?.data?.error || 'Failed to update status' };
        }
    };

    return (
        <DriverContext.Provider value={{ driver, login, register, logout, updateStatus, loading }}>
            {children}
        </DriverContext.Provider>
    );
};

export const useDriver = () => useContext(DriverContext);
