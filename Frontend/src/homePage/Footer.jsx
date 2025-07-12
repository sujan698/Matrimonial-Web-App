import React from "react";
import logo from "../assets/main-logo.png";

const Footer = () => {
  return (
    <div
      className="flex space-x-52 bg-[#F24822] h-72 mt-[5%] p-[5%]"
      style={{ borderRadius: "55% 55% 10% 10% / 20% 20% 0% 0%  " }}
    >
      <div className="flex items-center justify-center w-28 h-28 bg-white rounded-full ">
        <img className="w-16" src={logo} alt="" />
      </div>
      <div className="flex space-x-32 text-white">
        <div className="flex flex-col -ml-16">
          <h2 className="mb-2 text-xl font-semibold">Why meroBihe?</h2>
          <p className="w-[45em] font-medium">
            MeroBihe offers a modern, personalized way to find your life
            partner. Unlike traditional methods, it gives you full control over
            your preferences, ensuring better matches. Our goal is to make the
            process simple, safe, and truly meaningful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
