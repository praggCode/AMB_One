'use client';
import { cn } from "@/common/lib/utils"
import { Button } from "@/common/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/common/ui/field"
import { Input } from "@/common/ui/input"
import { useState } from "react";
import { useUser } from "@/app/user/context/UserContext";
import { useDriver } from "@/app/driver/context/DriverContext";

export function LoginForm({
  className,
  role,
  ...props
}) {
  const { login: userLogin } = useUser();
  const { login: driverLogin } = useDriver();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let result;
    if (role === 'driver') {
      result = await driverLogin(email, password);
    } else {
      result = await userLogin(email, password);
    }

    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className={cn("w-full space-y-6", className)} {...props}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">
          {role === 'driver' ? 'Sign in to your driver account' : 'Sign in to continue'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">❌ {error}</p>
        </div>
      )}

      <FieldGroup className="space-y-5">
        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-semibold text-gray-700">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
        </Field>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl"
        >
          Sign In
        </Button>
      </FieldGroup>

      <FieldDescription className="text-center">
        Don&apos;t have an account?{' '}
        <a href={`/signup?role=${role || 'user'}`} className="text-blue-600 hover:underline font-semibold">
          Sign up
        </a>
      </FieldDescription>
    </form>
  )
}
