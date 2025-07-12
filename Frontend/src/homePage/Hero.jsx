import React from "react";
// import wedding from "../assets/wedding.jpeg";
import weddingok from "../assets/weddingTwo.png"
import { useNavigate } from "react-router-dom";
import group from '../assets/Group 72.png'

const Hero = () => {
  const navigate = useNavigate()
  const handleRegister = () => {
    navigate('/register')
  }

  //bg-[#FF6347]
  return (
    <div className="relative ">
      <img src={weddingok} className="w-full h-[700px] object-cover" alt="wed" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <div className="absolute top-24 left-[65%] w-80">
        <img src={group} alt="" />
      </div>
      <div className="absolute left-[6%] right-[74.95%] top-[18%] bottom-[93.61%] flex items-center justify-center text-white font-curve font-normal text-[40px] leading-[50px]">
        "Match. Meet. Marry".
      </div>
      <h2 className="absolute top-[22%] left-[5%] text-white font-inter text-5xl font-extrabold ">
        Find your perfect <br />
        <span className="text-transparent bg-gradient-to-t from-yellow-400 to-yellow-100 bg-clip-text">
          life partner.
        </span>
      </h2>
      <p className="absolute top-[40%] left-[5%] font-outfit font-[400] text-[28px] text-white">
        Your perfect platform in finding the perfect match. <br />We offer a fun and personalized matchmaking
        <br /> experience for those ready to find perfect partner.
      </p>

      <button
        onClick={handleRegister}
        className="absolute top-[63%] left-[5%] w-40 text-[#FF6347] bg-white font-bold rounded-xl p-3 hover:text-amber-950 hover:border-2 hover:border-yellow-500"
      >
        Join Now
      </button>
    </div>
  );
};
/* “Match. Meet. Marry.” */

export default Hero;
