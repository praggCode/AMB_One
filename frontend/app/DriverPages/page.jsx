"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserNav from "@/components/UserNav";
import {MapPin,Clock,User,ChevronRight,LayoutDashboard,History,CheckCircle2,AlertCircle} from "lucide-react";

export default function DriverDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [currentBooking, setCurrentBooking] = useState(null);
    const [driverTrip, setDriverTrip] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedBooking = localStorage.getItem("currentBooking");
        const storedTrip = localStorage.getItem("driverCurrentTrip");
        const storedHistory = localStorage.getItem("driverHistory");
        if (storedBooking) setCurrentBooking(JSON.parse(storedBooking));
        if (storedTrip) setDriverTrip(JSON.parse(storedTrip));
        if (storedHistory) setHistory(JSON.parse(storedHistory));
    }, []);

    const stats = {
        total: (history?.length || 0) + (driverTrip ? 1 : 0) + (currentBooking ? 1 : 0),
        pending: currentBooking ? 1 : 0,
        completed: history?.length || 0,
    };

    const driverTabs = [
        { label: "Dashboard", href: "/DriverPages" },
        { label: "History", href: "/DriverPages/history" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Driver Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your assigned trips</p>
                </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500 mb-2">Total Trips Today</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500 mb-2">Pending</p>
                    <p className="text-4xl font-bold text-amber-500">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-gray-500 mb-2">Completed</p>
                    <p className="text-4xl font-bold text-emerald-500">{stats.completed}</p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Assigned Trips</h2>

            <div className="space-y-6">
                {driverTrip && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Trip #{driverTrip.id}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mt-1">
                                        <Clock size={14} className="mr-1.5" />
                                        {new Date(driverTrip.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-[#D70040] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                    Accepted
                                </span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#D70040] ring-4 ring-[#FFD6E0]" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pickup</p>
                                        <p className="text-gray-900 font-medium">{driverTrip.pickupLocation}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-50" />
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
                                href={`/DriverPages/trip/${driverTrip.id}`}
                                className="w-full flex items-center justify-center gap-2 bg-[#D70040] hover:bg-[#B60035] text-white py-3 px-4 rounded-xl font-medium transition-colors"
                            >
                                View Details
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                )}

                {currentBooking && !driverTrip && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Trip #{currentBooking.id}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mt-1">
                                        <Clock size={14} className="mr-1.5" />
                                        {new Date(currentBooking.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wide">
                                    New Request
                                </span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#D70040] ring-4 ring-[#FFD6E0]" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pickup</p>
                                        <p className="text-gray-900 font-medium">{currentBooking.pickupLocation}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-50" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Destination</p>
                                        <p className="text-gray-900 font-medium">{currentBooking.destination}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User size={16} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Patient</p>
                                        <p className="text-gray-900 font-medium">{currentBooking.patientName}</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/DriverPages/request/${currentBooking.id}`}
                                className="w-full flex items-center justify-center gap-2 bg-[#D70040] hover:bg-[#B60035] text-white py-3 px-4 rounded-xl font-medium transition-colors"
                            >
                                View Details
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}
