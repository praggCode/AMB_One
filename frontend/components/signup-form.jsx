'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
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
    setIsLoading(true);
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

    setIsLoading(false);

    if (!result.success) {
      toast.error(result.message || "Registration failed");
    } else {
      toast.success("Account created successfully!");
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4", className)} {...props}>
      <Card className="w-full max-w-5xl overflow-hidden shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleCreateAccount} className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">
                {role === 'driver' ? 'Join our team of drivers' : 'Get started with emergency services'}
              </p>
            </div>

            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-[#D70040] focus:ring-[#D70040]"
                />
              </Field>

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
                <FieldLabel htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-[#D70040] focus:ring-[#D70040]"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-[#D70040] focus:ring-[#D70040]"
                />
                <FieldDescription className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters long
                </FieldDescription>
              </Field>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#D70040] hover:bg-[#B8003A] text-white font-semibold mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </FieldGroup>

            <FieldDescription className="text-center mt-6">
              Already have an account?{' '}
              <a href={`/login?role=${role || 'user'}`} className="text-[#D70040] hover:underline font-semibold">
                Sign in
              </a>
            </FieldDescription>
          </form>

          <div className="relative hidden md:block min-h-[600px] bg-gray-100">
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
