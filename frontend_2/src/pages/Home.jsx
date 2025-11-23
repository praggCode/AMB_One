import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1642438114426-bad6b9ce05da?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-10 flex justify-between flex-col w-full">
        <h1 className="ml-8 text-4xl sm:text-3xl font-bold tracking-tight drop-shadow-lg">
          <span className="inline-block bg-clip-text text-white bg-gradient-to-r from-white/90 via-yellow-200 to-white/90">
            AmbOne
          </span>
        </h1>

        <div className="bg-white py-6 pb-8 px-5 rounded-t-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-3">
            Get Started With AmbOne
          </h2>
          <Link to='/login' className="flex items-center justfy-center w-full bg-black text-white py-3 rounded-lg mt-4 font-medium flex items-center justify-center gap-2">
            Continue
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
