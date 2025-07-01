import React, { useEffect, useState } from "react";
// Import the doodle image
import DoodleImage from "../assets/hospital.jpg"; // Update the path as needed
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username: "", psw: "" });
  function getCredentials(event) {
    const { name, value } = event.target;
    setCred({
      ...cred,
      [name]: value,
    });
  }
  async function signin(e) {
    e.preventDefault();

    const loginHandler = await fetch("http://localhost:2024/api/logincare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: cred.username, psw: cred.psw}),
    });
    const response = await loginHandler.json();
    if (response.length > 0) {
      localStorage.setItem("username", cred.username);
      localStorage.setItem("psw", cred.psw);
      localStorage.setItem("logo", response[0].Logo);
      if(response[0].Logo2)
      {
        localStorage.setItem("logo2", response[0].Logo2);
      }
      localStorage.setItem("user", response[0].user);
      localStorage.setItem("API", response[0].API);
      navigate("/Dashboard");
      window.location.reload();
    }
  }

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("psw")) {
      navigate("/Dashboard");
    } else {
      console.log("False.....");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-sky-200">
      {/* Doodle Image */}
      {/* <img
        src={DoodleImage}
        alt="logo"
        className="w-28 mb-8 animate-fade-in"
      /> */}

      <div className="relative flex flex-col items-center w-11/12 max-w-md p-8 bg-white rounded-3xl shadow-lg sm:w-96 overflow-hidden">
        {/* Floating Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-300 rounded-full opacity-50 animate-spin-slow"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-60 animate-pulse"></div>

        {/* Title */}
        <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-700">
          Welcome Back!
        </h2>

        {/* Form */}
        <form className="w-full space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              name="username"
              onChange={getCredentials}
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="psw"
              placeholder="Password"
              onChange={getCredentials}
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300 ease-in-out"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={signin}
            className="w-full py-3 text-white bg-gradient-to-r from-sky-400 to-blue-500 rounded-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-sky-400 transition-transform transform hover:scale-105 ease-in-out duration-300 shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Additional Text */}
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-sky-500 hover:underline hover:text-sky-700 transition ease-in-out duration-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
