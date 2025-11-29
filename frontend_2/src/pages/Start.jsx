import React from "react";
import { ArrowRight, Ambulance, Clock, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/button";

const Start = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col justify-between p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Ambulance className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            AmbOne
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Ambulance className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Emergency Ambulance
              <br />
              Booking System
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              Fast, reliable ambulance services at your fingertips
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Clock className="w-6 h-6 text-white mb-2 mx-auto" />
                <p className="text-white text-sm font-medium">24/7 Available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="w-6 h-6 text-white mb-2 mx-auto" />
                <p className="text-white text-sm font-medium">Real-time Tracking</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Shield className="w-6 h-6 text-white mb-2 mx-auto" />
                <p className="text-white text-sm font-medium">Safe & Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Get Started
            </h3>
            <p className="text-gray-600">
              Sign in or create an account to book an ambulance
            </p>
          </div>
          
          <Link to="/login" className="block">
            <Button className="w-full" size="lg">
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
