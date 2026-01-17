'use client';
import { cn } from "@/modules/common/lib/utils"
import { Button } from "@/modules/common/ui/button"
import { Card, CardContent } from "@/modules/common/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/modules/common/ui/field"
import { Input } from "@/modules/common/ui/input"
import { useState } from "react";
import { useUser } from "@/modules/user/context/UserContext";
import { useDriver } from "@/modules/driver/context/DriverContext";

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
    <div className={cn("min-h-screen flex items-center justify-center p-4", className)} {...props}>
      <Card className="w-full max-w-5xl overflow-hidden shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                {role === 'driver' ? 'Sign in to your driver account' : 'Sign in to continue'}
              </p>
            </div>

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
                  className="h-12 border-gray-300 focus:border-[#D70040] focus:ring-[#D70040]"
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
                  className="h-12 border-gray-300 focus:border-[#D70040] focus:ring-[#D70040]"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </Field>

              <Button
                type="submit"
                className="w-full h-12 bg-[#D70040] hover:bg-[#B8003A] text-white font-semibold"
              >
                Sign In
              </Button>
            </FieldGroup>

            <FieldDescription className="text-center mt-2">
              Don&apos;t have an account?{' '}
              <a href={`/signup?role=${role || 'user'}`} className="text-[#D70040] hover:underline font-semibold">
                Sign up
              </a>
            </FieldDescription>
          </form>

          <div className="relative hidden md:block min-h-[500px] bg-gray-100">
            {role === 'driver' && (
              <img
                src="/medical-simple.png"
                alt="Driver"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {role === 'user' && (
              <img
                src="/user-illustration.png"
                alt="User"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
