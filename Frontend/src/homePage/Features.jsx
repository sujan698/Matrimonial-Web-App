import React from "react";
import simple from "../assets/simple .png";
import component from "../assets/Component.png";
import chat from "../assets/fluent_chat-48-filled.png";

const Features = () => {
  return (
    <div className="font-outfit" id="features">
      <h2 className="text-center font-extrabold text-[40px] text-[#FF6347] mt-36">
        Our Features
      </h2>
      <p className="ml-[5%] mr-[5%] text-[20px] mt-20 text-[#333333]">
        We understand that finding a life partner is a deeply personal journey.
        At MeroBihe, we bring together individuals with shared values and
        aspirations, focusing on meaningful connections and a smooth experience.
        Join us today to explore a supportive, transparent, and privacy-centric
        platform that empowers you in your journey toward marriage.
      </p>
      <div className="flex justify-evenly mt-[5%]">
        <div className="w-[22%] shadow-xl shadow-gray-300 rounded-3xl h-96">
          <img className="w-[30%] mx-auto mt-16 mb-4" src={simple} alt="" />
          <h3 className="text-[#FF6347] font-semibold text-2xl text-center">
            Simple User Interface
          </h3>
          <p className="p-5 text-center text-[#333333]">
            Designed to be user-friendly and easy to navigate and browse profiles, connect, and interact effortlessly
            for a smooth experience.
          </p>
        </div>
        <div className="w-[22%] shadow-xl shadow-gray-300 rounded-3xl h-96">
          <img className="w-[45%] mx-auto mt-8" src={component} alt="" />
          <h3 className="text-[#FF6347] font-semibold text-2xl text-center">
            Personalized Matches
          </h3>
          <p className="p-5 text-center text-[#333333]">
            Receive highly personalized matches based on a deep analysis of your
            preferences, interests, and values, helping you find the ideal
            partner.
          </p>
        </div>
        <div className="w-[22%] shadow-xl shadow-gray-300 rounded-3xl h-96">
          <img className="w-[45%] mx-auto mt-8" src={chat} alt="" />
          <h3 className="text-[#FF6347] font-semibold text-2xl text-center">
            Real Time Chatting
          </h3>
          <p className="p-5 text-center text-[#333333]">
            Receive real time communication message to keep connected with your
            connected ones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
