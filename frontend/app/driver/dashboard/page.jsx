'use client';

import React, { useState } from 'react';
import { useDriver } from '../../../context/DriverContext';
import { Clock, MapPin, User, Phone, Mail, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DriverNav from '@/components/DriverNav';
import { toast } from 'sonner';

export default function DriverDashboardPage() {
    const router = useRouter();
    const { driver, loading, updateDriverStatus, logout } = useDriver();
    const [isTogglingStatus, setIsTogglingStatus] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#D70040] border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!driver) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
                    <button
                        onClick={() => router.push('/login?role=driver')}
                        className="bg-[#D70040] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B8003A] transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const handleToggleStatus = async () => {
        const newStatus = driver.status === 'active' ? 'inactive' : 'active';
        setIsTogglingStatus(true);

        const result = await updateDriverStatus(newStatus);

        if (result.success) {
            toast.success(`Status changed to ${newStatus}`);
        } else {
            toast.error(result.message || 'Failed to update status');
        }

        setIsTogglingStatus(false);
    };

    const handleLogout = () => {
        logout();
    };

    const isActive = driver.status === 'active';

    return (
        <div className="min-h-screen bg-gray-50">
            <DriverNav active="Dashboard" />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Driver Dashboard</h2>
                        <p className="text-gray-600 text-lg">Welcome back, {driver.fullname?.firstName}!</p>
                    </div>
                    <button
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {/* Status Toggle Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Activity className="h-6 w-6 text-gray-600" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Your Status</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {isActive ? 'You are currently accepting rides' : 'You are currently offline'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleToggleStatus}
                            disabled={isTogglingStatus}
                            className={`${isActive
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-red-500 hover:bg-red-600'
                                } text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]`}
                        >
                            {isTogglingStatus ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                    Updating...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-lg">{isActive ? '🟢' : '🔴'}</span>
                                    {isActive ? 'Active' : 'Inactive'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Driver Information */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h3>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-4">
                            {/* Name */}
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                                    <p className="text-gray-900 font-medium">
                                        {driver.fullname?.firstName} {driver.fullname?.lastName || ''}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <p className="text-gray-900 font-medium">{driver.email}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-3">
                                <Activity className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Current Status</p>
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {isActive ? '🟢 Active' : '🔴 Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Location */}
                            {driver.location && (driver.location.latitude || driver.location.longitude) && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Last Known Location</p>
                                        <p className="text-gray-900 font-medium">
                                            Lat: {driver.location.latitude || 'N/A'}, Lon: {driver.location.longitude || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <path strokeWidth="2" d="M12 8v4m0 4h.01" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-blue-700 font-semibold mb-1">💡 Quick Tip</h3>
                            <p className="text-blue-800 text-sm">
                                Toggle your status to <strong>{isActive ? 'Inactive' : 'Active'}</strong> when you {isActive ? 'want to stop' : 'are ready to start'} receiving ride requests. Your status will be updated instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
