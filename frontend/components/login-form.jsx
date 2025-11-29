'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field, FieldDescription, FieldGroup, FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useDriver } from "@/context/DriverContext";
import { toast } from "sonner";

export function LoginForm({
  className,
  role,
  ...props
}) {
  const { login: userLogin } = useUser();
  const { login: driverLogin } = useDriver();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (role === 'driver') {
        result = await driverLogin(email, password);
      } else {
        result = await userLogin(email, password);
      }

      if (result.success) {
        toast.success("Login successful! Welcome back.");
      } else {
        toast.error(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-white p-4", className)} {...props}>
      <Card className="w-full max-w-5xl border shadow-sm overflow-hidden">
        <CardContent className="p-0 grid md:grid-cols-2">
          {/* Form Section */}
          <div className="p-8 md:p-12 bg-white">
            <form onSubmit={handleLogin}>
              <FieldGroup>
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex h-25 w-25 items-center justify-center rounded-xl overflow-hidden mb-4">
                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600">
                    {role === 'driver' ? 'Sign in to your driver account' : 'Sign in to continue'}
                  </p>
                </div>

                {/* Email Field */}
                <Field>
                  <FieldLabel htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    className="mt-1 h-11"
                  />
                </Field>

                {/* Password Field */}
                <Field>
                  <FieldLabel htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="mt-1 h-11"
                  />
                </Field>

                {/* Submit Button */}
                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-[#D70040] hover:bg-[#B8003A] text-white font-medium"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </Field>

                {/* Sign up link */}
                <FieldDescription className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href={`/signup?role=${role || 'user'}`}
                    className="text-[#D70040] hover:text-[#B8003A] font-medium"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center p-12" style={{ backgroundColor: '#f9fafb' }}>
            <img
              src={role === 'driver' ? "/medical-simple.png" : "/user-illustration.png"}
              alt={role === 'driver' ? 'Driver Login' : 'User Login'}
              className="w-full h-auto max-w-md object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
