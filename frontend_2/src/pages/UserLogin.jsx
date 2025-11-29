import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { toast } from "sonner";
import { Ambulance, Mail, Lock, LogIn, UserCog } from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Card from "../components/ui/card";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Login successful! Welcome back 🚑");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      let message = "Login failed. Please check your credentials.";
      
      if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.response?.status === 401) {
        message = "Invalid email or password";
      } else if (error.code === "ERR_NETWORK") {
        message = "Unable to connect to server. Please check your connection.";
      }
      
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4 shadow-lg">
            <Ambulance className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
              AmbOne
            </span>
          </h1>
          <p className="text-gray-600">Sign in to book ambulances</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl">
          <Card.Content className="p-6">
            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-600" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New Here?{" "}
                <Link
                  to="/signup"
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline transition"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Captain Login Link */}
        <div className="mt-6">
          <Link
            to="/captain-login"
            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg px-4 py-3 transition"
          >
            <UserCog className="w-5 h-5" />
            Sign In as a Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
