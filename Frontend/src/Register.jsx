import React, { useState } from "react";
import mainLogo from "./assets/main-logo.png";
import wedding from "./assets/wedding.jpeg";
import Select from "react-select";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../src/api/index";
import { FaEye } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formData, gender: selectedOption?.value || "" });
  };

  // Update checkbox state
  const handleTermsChange = (e) => {
    setIsTermsChecked(e.target.checked);
  };

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 20;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTermsChecked) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    // Validate gender selection
    if (!formData.gender) {
      alert("Please select a gender.");
      return;
    }

    if (!validateAge(formData.dob)) {
      setError("User must be 20 years or older to register.");
      return;
    }
    // if (formData.password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }
    const formattedDob = new Date(formData.dob).toISOString().split("T")[0]; // "YYYY-MM-DD"

    try {
      // Send form data to the `users` API
      const userResponse = await api.post("http://localhost:3000/users", {
        ...formData,
        dob: formattedDob,
      });

      console.log("User created successfully:", userResponse.data);

      localStorage.setItem("userId", userResponse.data.id);

      // Send OTP to the email
      const otpResponse = await axios.post(
        "http://localhost:3000/auth/send-otp",
        {
          email: formData.email,
        }
      );
      console.log("OTP sent successfully:", otpResponse.data);

      if (otpResponse.data.success) {
        // Navigate to OTP page
        navigate("/register/otp", { state: { email: formData.email } });
      } else {
        alert(otpResponse.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response?.data?.message || error.message
      );
      alert("An error occurred while processing your request.");
    }
  };
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "NonBinary", label: "Other" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      display: "flex",
      borderRadius: "0.375rem",
      padding: "0.25rem",
      borderColor: "rgb(209 213 219)",
      boxShadow: "1px 1px 1px rgb(209 213 219)",
      "&:hover": {
        borderColor: "rgb(107 114 128)",
      },
      "&:focus": {
        outline: "hidden",
      },
    }),
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
      id="register"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <form
        onSubmit={handleSubmit}
        className="absolute px-28 h-[35em] shadow-lg bg-white w-[50em] rounded-3xl"
      >
        <h2 className="text-center text-3xl text-[#FF6347] font-semibold mt-6 mb-10">
          Register Now!
        </h2>
        <img
          className="absolute w-16 cursor-pointer top-5 left-16"
          src={mainLogo}
          alt=""
          onClick={() => (window.location.href = "/")}
        />
        <div className="flex flex-col space-y-5">
          <input
            className="w-full p-2 pl-5 shadow-md focus:outline-none"
            type="text"
            placeholder="Full Name *"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 pl-5 shadow-md focus:outline-none"
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative flex space-x-10">
            <input
              className="w-full p-2 pl-5 text-gray-400 shadow-md focus:outline-none"
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <span className="absolute top-3.5 left-20 text-gray-400 text-sm">
              (AD)
            </span>
            <Select
              className="w-full"
              styles={customStyles}
              placeholder="Gender"
              onChange={handleGenderChange}
              options={genderOptions}
              value={genderOptions.find(
                (option) => option.value === formData.gender
              )}
            />
          </div>
          <div className="relative">
            <input
              className="w-full p-2 pl-5 shadow-md focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FaEye
              onClick={togglePasswordVisibility}
              className="text-2xl text-[#FF4822] absolute top-2 left-[90%]"
            />
          </div>
          <input
            className="w-full p-2 pl-5 shadow-md focus:outline-none"
            type={showPassword ? "text" : "password"}
            // value={confirmPassword}
            placeholder="Confirm Password *"
            // onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />
          <label
            className="ml-2 text-sm text-center text-gray-600"
            htmlFor="remember"
          >
            {error && (
              <p className="text-sm text-center text-red-500">{error}</p>
            )}
            <input
              type="checkbox"
              id="terms"
              checked={isTermsChecked}
              onChange={handleTermsChange}
            />{" "}
            I've read and agree to the{" "}
            <Link className="text-[#F24822]" to={"/termsandconditions"}>
              Terms and Conditions
            </Link>{" "}
            and <Link className="text-[#F24822]" to={"/privacypolicy"}>Privacy Policy</Link>.
          </label>

          <button
            type="submit"
            className={`w-96 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold ${
              isTermsChecked
                ? "hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isTermsChecked}
          >
            Register
          </button>
          <p className="text-center text-gray-600">
            Already a Member?
            <Link to="/login" className="text-[#F24822] ml-2 underline">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
