'use client';

import { LoginForm } from "@/components/login-form"
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || undefined;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <LoginForm role={role} />
      </div>
    </div>
  )
}
