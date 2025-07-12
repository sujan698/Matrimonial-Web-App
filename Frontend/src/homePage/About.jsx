import React from "react";
import picture from "../assets/wed-about.png";

const About = () => {
  return (
    <div className="font-outfit" id="about">
      <h2 className="text-center font-extrabold text-[40px] text-[#FF6347] mt-20">
        About
      </h2>
      <div className="flex justify-between ml-[5%] text-[20px] mt-20 text-[#333333]">
        <p>
          We understand that finding a life partner is a <br /> deeply personal
          journey. At MeroBihe, we <br /> bring together individuals with shared
          values <br />
          and aspirations, focusing on meaningful <br /> connections and a
          smooth experience. <br />
          <p className="mt-10">
            <span className="text-[#FF6347] text-[40px] font-bold underline">
              <a href="">
              Join us
              </a>
            </span>{" "}
            today to explore a supportive, <br />
            transparent, and privacy-centric platform that <br /> empowers you
            in your journey toward marriage.
          </p>
        </p>
        <img
          className="mr-[5%] w-[46%] h-80 border-4 border-[#FF6347] rounded-3xl "
          src={picture}
          alt=""
        />
      </div>
    </div>
  );
};

export default About;
