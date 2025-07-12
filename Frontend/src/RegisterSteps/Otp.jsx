// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function Otp() {
//   const [otp, setOtp] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email; // Retrieve email from navigation state

//   const handleVerify = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/auth/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("OTP verified successfully!");
//         navigate("/register/step2"); // Redirect to a success page
//       } else {
//         alert(data.message || "Invalid OTP!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         required
//       />
//       <button onClick={handleVerify}>Verify</button>
//     </div>
//   );
// }

import React, { useState } from "react";
import wedding from "../assets/weddingTwo.png";
import mainLogo from "../assets/main-logo.png";
import { BsExclamationTriangleFill } from "react-icons/bs";
import EmptyPhotoComp from "./EmptyPhotoComp";
import { useLocation, useNavigate } from "react-router-dom";


const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        alert("OTP verified successfully!");
        navigate("/register/step1"); // Redirect to a success page
      } else {
        alert(data.message || "Invalid OTP!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="relative flex justify-center w-full h-screen items-center bg-center bg-cover font-outfit"
      id="otp"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <div className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl">
        <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
        <h2 className="text-[#FF6347] font-semibold text-center text-2xl mt-32 ">
          OTP Code Verification
        </h2>
        <p className="flex items-center justify-center text-sm text-gray-500 gap-x-1">
          Enter the OTP code sent to your email
        </p>
        {/* Otp goes here*/}
        <div className="w-full flex justify-center mt-10 ">
          <input
            type="text"
            className="border-2 border-gray-500 pl-32 rounded-lg h-10 w-80"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col justify-around mt-10">
          <button
            className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
            onClick={handleVerify}
          >
            Verify OTP
          </button>
          <p className="text-center text-gray-600 mt-2">
            Didn't receive code?{" "}
            <span className="underline text-[#F24822] cursor-pointer">
              Resend code
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
