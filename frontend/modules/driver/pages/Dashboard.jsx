"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserNav from '@/modules/user/components/UserNav';
import { Clock, User, ChevronRight, LayoutDashboard } from "lucide-react";
import { useDriver } from "@/modules/driver/context/DriverContext";
import { useRouter } from "next/navigation"
import api from '@/modules/common/lib/api';

export default function DriverDashboard() {
    const { driver, loading } = useDriver();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [pendingBookings, setPendingBookings] = useState([]);
    const [driverTrip, setDriverTrip] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!loading && !driver) {
            router.push('/login?role=driver');
        }
    }, [driver, loading, router]);

    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                let lat, lon;
                if (navigator.geolocation) {
                    try {
                        const position = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                        });
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                    } catch (e) {
                        console.warn("Could not get location, fetching all bookings:", e);
                    }
                }

                const pendingRes = await api.get('/bookings/pending', {
                    params: { lat, lon }
                });
                setPendingBookings(pendingRes.data || []);

                const historyRes = await api.get('/bookings/driver-history');
                setHistory(historyRes.data || []);
                const activeTrip = historyRes.data.find(t => t.status === 'accepted' || t.status === 'ongoing' || t.status === 'Accepted');
                setDriverTrip(activeTrip || null);

            } catch (error) {
                if (error.response?.status === 401) {
                    router.push('/login?role=driver');
                } else {
                    console.error("Failed to fetch driver data:", error);
                }
            }
        };

        if (driver) {
            fetchDriverData();
        }
    }, [driver]);

    const stats = {
        total: (history?.length || 0),
        pending: pendingBookings.length,
        completed: history?.filter(t => t.status === 'completed' || t.status === 'Completed').length || 0,
    };

    const driverTabs = [
        { label: "Dashboard", href: "/driver/dashboard" },
        { label: "History", href: "/driver/history" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Driver Dashboard</h1>
                    <p className="text-gray-600 text-lg mt-2">Welcome back, {driver?.fullname?.firstName} {driver?.fullname?.lastName}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Total Trips Today</p>
                        <p className="text-5xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Pending Requests</p>
                        <p className="text-5xl font-bold text-amber-500">{stats.pending}</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Completed</p>
                        <p className="text-5xl font-bold text-emerald-500">{stats.completed}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Trips</h2>

                <div className="space-y-6">
                    {driverTrip && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-[#2563EB]">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Trip #{driverTrip.bookingId}</h3>
                                        <div className="flex items-center text-gray-500 text-sm mt-1">
                                            <Clock size={14} className="mr-1.5" />
                                            {new Date(driverTrip.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                        Accepted
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-[#2563EB] ring-4 ring-blue-100" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pickup</p>
                                            <p className="text-gray-900 font-medium">{driverTrip.pickup}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-[#E84D4D] ring-4 ring-red-50" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Destination</p>
                                            <p className="text-gray-900 font-medium">{driverTrip.destination}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <User size={16} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Patient</p>
                                            <p className="text-gray-900 font-medium">{driverTrip.patientName}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/driver/trip/${driverTrip._id}`}
                                    className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl"
                                >
                                    View Details
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {!driverTrip && pendingBookings.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                                <LayoutDashboard className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No Active Trips</h3>
                            <p className="text-gray-500">Waiting for new booking requests...</p>
                        </div>
                    )}
                </div>

                {!driverTrip && pendingBookings.length > 0 && (
                    <>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 mt-10">New Requests ({pendingBookings.length})</h2>
                        <div className="space-y-6">
                            {pendingBookings.map((booking) => (
                                <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">Trip #{booking.bookingId}</h3>
                                                <div className="flex items-center text-gray-500 text-sm mt-1">
                                                    <Clock size={14} className="mr-1.5" />
                                                    {new Date(booking.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">
                                                New Request
                                            </span>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-[#2563EB] ring-4 ring-blue-100" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pickup</p>
                                                    <p className="text-gray-900 font-medium">{booking.pickup}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-[#E84D4D] ring-4 ring-red-50" />                                     <div>
                                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Destination</p>
                                                    <p className="text-gray-900 font-medium">{booking.destination}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <User size={16} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Patient</p>
                                                    <p className="text-gray-900 font-medium">{booking.patientName}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/driver/request/${booking._id}`}
                                            className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl"
                                        >
                                            View Request
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
