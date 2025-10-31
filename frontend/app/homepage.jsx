"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginDriver from "./LoginDriver";
import UserLogin from "./UserLogin";

export default function Homepage() {
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const handleJoinDriver = () => {
    setShowDriverForm(true);
    setShowUserForm(false);
  };

  const handleBookAmbulance = () => {
    setShowUserForm(true);
    setShowDriverForm(false);
  };

  const handleBack = () => {
    setShowDriverForm(false);
    setShowUserForm(false);
  };

  if (showDriverForm) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#2b2d42]">Join as Driver</h1>
            <Button onClick={handleBack} variant="outline">Back</Button>
          </div>
          <LoginDriver />
        </div>
      </div>
    );
  }

  if (showUserForm) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#2b2d42]">Book Your Ambulance</h1>
            <Button onClick={handleBack} variant="outline">Back</Button>
          </div>
          <UserLogin />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-white text-gray-900 border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-blue-600">
              AMB One
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 mt-2">
                Emergency Ambulance Services
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 max-w-3xl mx-auto text-gray-600">
              When every second counts, we're here to provide fast, reliable, and compassionate emergency transportation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleJoinDriver}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚑 Join as Driver
              </Button>
              <Button
                onClick={handleBookAmbulance}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                📞 Book Ambulance
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AMB One?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional emergency services with cutting-edge technology and compassionate care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rapid Response</h3>
              <p className="text-gray-600 leading-relaxed">
                Emergency dispatch within minutes, 24/7 availability across the city with GPS tracking.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-200">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Medical Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Trained paramedics and state-of-the-art medical equipment for critical care transport.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-200">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Over 50,000 lives saved with a 99% success rate and 500+ professional drivers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 lg:py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">50K+</div>
              <p className="text-gray-600 font-medium">Lives Saved</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-500 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Service</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-500 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Drivers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">99%</div>
              <p className="text-gray-600 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-900 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">AMB One</h3>
              <p className="text-gray-600">Emergency services made simple.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <span className="text-gray-600">Emergency Hotline: <span className="text-red-500 font-semibold">911</span></span>
              <span className="text-gray-600">Support: <span className="text-blue-500">support@ambone.com</span></span>
            </div>
            <p className="text-gray-600">&copy; 2024 AMB One. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
