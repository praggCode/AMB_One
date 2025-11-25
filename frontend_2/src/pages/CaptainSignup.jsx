import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainDataContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      phoneNumber: phone,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/driver/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.driver);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }

    setEmail("");
    setPhone("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-4xl sm:text-3xl font-bold tracking-tight drop-shadow-lg">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              AmbOne
            </span>
          </h1>
          {/* <img></img> */}
          <form onSubmit={submitHandler}>
            <h3 className="text-lg  mt-10 font-medium mb-2">
              What's our captain's name
            </h3>

            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-gray-100 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                required
                className="bg-gray-100 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">
              What's our captain's email
            </h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">
              What's our captain's phone
            </h3>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-100 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="9876543210"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-gray-100 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
            />

            <button className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg hover:bg-black/80 transition">
              Create account
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/captain-login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight text-center text-gray-500">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
export default CaptainSignup;
