'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useDriver } from "@/context/DriverContext";
import { toast } from "sonner";

export function SignupForm({
  className,
  role,
  ...props
}) {
  const { register: userRegister } = useUser();
  const { register: driverRegister } = useDriver();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!phone) {
      toast.error("Phone number is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      let result;

      if (role === 'driver') {
        const nameParts = name.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        result = await driverRegister({
          email,
          password,
          fullname: {
            firstName,
            lastName: lastName || undefined
          },
          phoneNumber: phone
        });
      } else {
        result = await userRegister({
          email,
          password,
          name,
          phone
        });
      }

      if (result.success) {
        toast.success("Account created successfully! Welcome aboard.");
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
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
            <form onSubmit={handleCreateAccount}>
              <FieldGroup>
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex h-25 w-25 items-center justify-center rounded-xl overflow-hidden mb-4">
                    <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Create Account
                  </h1>
                  <p className="text-gray-600">
                    {role === 'driver' ? 'Join our team of drivers' : 'Get started today'}
                  </p>
                </div>

                {/* Name Field */}
                <Field>
                  <FieldLabel htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Hariksh Suryabanshi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                    className="mt-1 h-11"
                  />
                </Field>

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

                {/* Phone Field */}
                <Field>
                  <FieldLabel htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    placeholder="At least 8 characters"
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
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </Field>

                {/* Sign in link */}
                <FieldDescription className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href={`/login?role=${role || 'user'}`}
                    className="text-[#D70040] hover:text-[#B8003A] font-medium"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center p-12" style={{ backgroundColor: '#f9fafb' }}>
            <img
              src={role === 'driver' ? "/medical-simple.png" : "/user-illustration.png"}
              alt={role === 'driver' ? 'Driver Signup' : 'User Signup'}
              className="w-full h-auto max-w-md object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
