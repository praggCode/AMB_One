'use client';

import React from 'react';
import { useDriver } from '../../../context/DriverContext';
// import DriverDashboard from '../../CompPages/DriverDashboard/DriverDashboard'; // Uncomment if exists

export default function DriverDashboardPage() {
    const { driver, loading } = useDriver();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!driver) {
        return <div>Please log in</div>;
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
            <p>Welcome, {driver.fullname?.firstName} {driver.fullname?.lastName}</p>
            {/* <DriverDashboard /> */}
            <div className="mt-6 p-4 border rounded bg-gray-50">
                <h2 className="text-xl font-semibold">Status: {driver.status}</h2>
                <p>Location: {driver.location?.latitude}, {driver.location?.longitude}</p>
            </div>
        </div>
    );
}
