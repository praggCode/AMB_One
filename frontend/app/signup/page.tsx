'use client';

import { SignupForm } from "@/components/signup-form"
import { useSearchParams } from 'next/navigation';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || undefined;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <SignupForm role={role} />
      </div>
    </div>
  )
}
