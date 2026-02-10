'use client';

import { cn } from "@/common/lib/utils"
import { Button } from "@/common/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/common/ui/field"
import { Input } from "@/common/ui/input"
import { useState } from "react";
import { useUser } from "@/app/user/context/UserContext";
import { useDriver } from "@/app/driver/context/DriverContext";

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
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
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

    if (!result.success) {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleCreateAccount} className={cn("w-full space-y-6", className)} {...props}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600">
          {role === 'driver' ? 'Join our team of drivers' : 'Get started with emergency services'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">❌ {error}</p>
        </div>
      )}

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
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
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
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            required
            minLength={10}
            maxLength={15}
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
          <FieldDescription className="text-xs text-gray-500 mt-1">
            Enter 10-15 digit phone number
          </FieldDescription>
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
            className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
          />
          <FieldDescription className="text-xs text-gray-500 mt-1">
            Must be at least 6 characters
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl"
        >
          Create Account
        </Button>
      </FieldGroup>

      <FieldDescription className="text-center">
        Already have an account?{' '}
        <a href={`/login?role=${role || 'user'}`} className="text-blue-600 hover:underline font-semibold">
          Sign in
        </a>
      </FieldDescription>
    </form>
  )
}
