import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainDataContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/driver/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.driver);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 max-w-md mx-auto flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-4xl sm:text-3xl font-bold tracking-tight drop-shadow-lg">
          <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            AmbOne
          </span>
        </h1>
        {/* <img></img> */}

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="mt-10"
        >
          <h3 className="mt-6 text-lg font-medium mb-2">What's your phone</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#f5f5f5] rounded-lg px-3 py-2 w-full text-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />

          <h3 className="text-lg font-medium mb-2">Password</h3>
          <input
            required
            value={password}
            onChange={(p) => setPassword(p.target.value)}
            type="password"
            placeholder="Enter your password"
            className="bg-[#f5f5f5] rounded-lg px-3 py-2  w-full text-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />

          <button className="mt-5 bg-black text-white font-semibold rounded-lg px-3 py-2 w-full text-lg shadow-md hover:bg-black/80 transition">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Join A Fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="flex items-center justify-center mt-5 bg-[#0D9488] text-white font-semibold rounded-lg px-3 py-2 w-full text-lg shadow-md hover:bg-[#0D9488]/70 transition"
        >
          Sign In as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
