"use client";
import React, { useEffect, useState } from "react";
import UserNav from "@/components/UserNav";
import { useRouter } from "next/navigation";
import { MapPin, User, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";
import api from '../../../../lib/api';
import { io } from 'socket.io-client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
});

export default function TripDetailsAccepted({ params }) {
    const router = useRouter();
    const [trip, setTrip] = useState(null);
    const resolvedParams = React.use(params);
    const id = resolvedParams?.id;
    const [location, setLocation] = useState(null);
    const [socket, setSocket] = useState(null);

    const driverTabs = [
        { label: "Dashboard", href: "/DriverPages" },
        { label: "History", href: "/DriverPages/history" },
    ];

    useEffect(() => {
        const fetchTrip = async () => {
            if (!id) return;
            try {
                const { data } = await api.get(`/bookings/${id}`);
                setTrip(data);
            } catch (error) {
                console.error("Failed to fetch trip details:", error);
            }
        };
        fetchTrip();
    }, [id]);
    useEffect(() => {
        if (!id) return;
        const newSocket = io('http://localhost:4000')
        setSocket(newSocket);
        newSocket.emit('join', { userId: id })
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const initialLocation = { lat: latitude, lon: longitude };
                    setLocation(initialLocation);
                    newSocket.emit('update-location', {
                        rideId: id,
                        location: initialLocation
                    });
                },
                (error) => console.error("Error getting initial location:", error),
                { enableHighAccuracy: true }
            );
        }

        // Watch Location
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation = { lat: latitude, lon: longitude };
                    setLocation(newLocation);
                    newSocket.emit('update-location', {
                        rideId: id,
                        location: newLocation
                    });
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
        }

        return () => {
            if (newSocket) newSocket.disconnect();
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [id]);

    const handleComplete = async () => {
        if (typeof window === "undefined" || !trip) return;
        try {
            await api.put(`/bookings/${trip._id}/status`, { status: 'completed' });
            router.push(`/DriverPages/history`);
        } catch (error) {
            console.error("Failed to complete trip", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <UserNav active="Dashboard" tabs={driverTabs} />

            <main className="p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Trip Details</h1>
                        <p className="text-sm text-gray-500">Trip #{trip?.bookingId}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#D70040] text-white text-xs font-bold rounded-full uppercase tracking-wide">Accepted</span>
                </div>
                <div className="bg-gray-100 rounded-2xl h-96 mb-6 overflow-hidden border border-gray-200 shadow-inner relative">
                    <MapComponent
                        pickup={trip?.pickupCoords ? { lat: trip.pickupCoords.coordinates[1], lon: trip.pickupCoords.coordinates[0] } : null}
                        destination={trip?.destinationCoords ? { lat: trip.destinationCoords.coordinates[1], lon: trip.destinationCoords.coordinates[0] } : null}
                        vehicleLocation={location}
                        readOnly={true}
                    />
                    {!location && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-[400]">
                            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                                <span className="text-xs font-bold text-gray-600">Locating GPS...</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Trip Information</h2>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <MapPin size={14} className="text-[#D70040]" />
                                    Pickup Location
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.pickup}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <User size={14} className="text-gray-400" />
                                    Patient Name
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.patientName}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <MapPin size={14} className="text-red-500" />
                                    Destination
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{trip?.destination}</p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                                    <Clock size={14} className="text-gray-400" />
                                    Booking Time
                                </div>
                                <p className="text-gray-900 font-medium text-lg">{new Date(trip?.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Fare Price</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">₹20/km</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Distance: {Number(trip?.distanceKm || 0)} km</p>
                                <p className="text-xl font-bold text-gray-900">₹{Number(trip?.distanceKm || 0) * 20}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col gap-3">
                        <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Phone size={18} />
                            Call Patient
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="w-full bg-[#D70040] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#B60035] transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <Navigation size={18} />
                                Navigate
                            </button>
                            <button onClick={handleComplete} className="w-full text-white font-bold py-3 px-4 rounded-xl bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 flex items-center justify-center gap-2">
                                <CheckCircle2 size={18} />
                                Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
