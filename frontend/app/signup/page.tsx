'use client';

import { SignupForm } from "@/components/signup-form"
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignupContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || undefined;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <SignupForm role={role} className="" />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
