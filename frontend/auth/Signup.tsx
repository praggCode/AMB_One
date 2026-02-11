'use client';

import { SignupForm } from "@/common/components/signup-form"
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignupContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || undefined;

  // Use blue gradient for all signup pages
  const gradientClass = 'bg-gradient-to-br from-blue-600 to-blue-800';
  const textAccentClass = 'text-blue-100';

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Animation Panel */}
      <div className={`hidden lg:flex w-1/2 ${gradientClass} items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
        <div className="relative z-10 w-3/4 max-w-lg">
          <img
            src={role === 'driver' ? "/Ambulance.png" : "/ambulance.webp"}
            alt={role === 'driver' ? "Ambulance" : "Patient Illustration"}
            className="w-full h-auto drop-shadow-2xl rounded-lg"
          />
          <div className="text-center mt-8 space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {role === 'driver' ? 'Driver Signup' : 'Patient Signup'}
            </h2>
            <p className={`${textAccentClass} text-lg`}>
              {role === 'driver' ? 'Become an Emergency Response Partner' : 'Get Quick Ambulance Access'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gray-50/50">
        <div className="w-full max-w-md space-y-6">
          <SignupForm role={role} className="" />
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
