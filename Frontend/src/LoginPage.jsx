import React, { useState } from "react";
import wedding from "./assets/wedding.jpeg";
import mainLogo from "./assets/main-logo.png";
import vertical_img from "./assets/Rectangle 78.png";
import img2 from "./assets/Rectangle 79.png";
import img3 from "./assets/Rectangle 80.png";
import img4 from "./assets/Rectangle 81.png";
import googlelogo from "./assets/image.png";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import axios from "axios";
import { FaEye } from "react-icons/fa6";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      const { token, user, userId, isBlocked } = response.data;

      if (isBlocked) {
        setError("You are blocked and cannot login.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);

      console.log("Login successful. User ID:", userId);
      console.log(
        "Stored userId in localStorage:",
        localStorage.getItem("userId")
      );

      login(token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        // Handle blocked user error
        setError("You are blocked and cannot login.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle other errors from the backend
        setError(error.response.data.message);
      } else {
        // Handle generic errors
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      id="login"
      className="relative w-full h-screen py-[9%] bg-center bg-cover font-outfit"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <div className="absolute flex items-center justify-center w-full space-x-10">
        <div className="p-5 h-[25em] bg-white w-[20%] rounded-3xl">
          <img
            className="w-16 mx-auto mb-6 cursor-pointer"
            src={mainLogo}
            alt=""
            onClick={() => (window.location.href = "/")}
          />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 w-full p-[5%]">
            <img className="w-20" src={vertical_img} alt="" />
            <img className="w-20 h-20" src={img2} alt="" />
            <img className="w-20 h-20" src={img4} alt="" />
            <img className="w-20 -mt-14" src={img3} alt="" />
          </div>
        </div>
        <form
          className="px-[8%] h-[25em] bg-white w-[50%] rounded-3xl"
          onSubmit={handleLogin}
        >
          <h2 className="text-[#FF6347] text-center text-3xl font-semibold mt-6 mb-10">
            Welcome to meroBihe
          </h2>
          <div className="relative flex items-center ">
            <input
              className="w-full p-2 pl-5 mb-4 shadow-md focus:outline-none"
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IoMdMail className="text-2xl text-[#FF4822] absolute right-2" />
          </div>
          <div className="relative flex items-center mt-4">
            <input
              className="w-full p-2 pl-5 shadow-md focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaEye
              onClick={togglePasswordVisibility}
              className="text-2xl text-[#FF4822] absolute right-2"
            />
          </div>
          <div className="mt-5 space-x-8 text-center">
            <span
              className="underline text-[#F24822] cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>
          <div className="relative flex mt-12 space-x-4 pl-50">
            <button
              className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
              type="submit"
            >
              Log In
            </button>
            {error && (
              <p className="absolute text-red-600 -mt-9 left-10">{error}</p>
            )}
          </div>
          <p className="mt-5 text-center text-gray-600">
            New member?
            <Link to="/register" className="text-[#F24822] ml-2 underline">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
