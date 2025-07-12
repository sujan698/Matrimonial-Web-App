import React from "react";
import comment from "../assets/fluent_comment-48-regular.png";
import pic1 from "../assets/hello.png";
import pic2 from "../assets/hello1.png";
import pic3 from "../assets/hello2.png";

const Testimonials = () => {
  return (
    <div className="font-outfit" id="testimonials">
      <h2 className="text-center font-extrabold text-[40px] text-[#FF6347] mt-20">
        Testimonials
      </h2>
      <p className="ml-[5%] mr-[5%] text-[20px] mt-20 text-[#333333]">
      Discover how MeroBihe has helped users find meaningful connections and lifelong partners 
      through a simple, personalized, and seamless experience
      </p>
      <div className="flex justify-evenly mt-[5%]">
        <div className="relative w-[18%] shadow-xl shadow-gray-300 rounded-3xl h-96 p-[1%]">
          <img className="absolute top-[6%] w-8" src={comment} alt="" />
          <img className="w-[50%] mx-auto mt-[6%]" src={pic1} alt="" />
          <h3 className="mt-[6%] mb-[6%] text-[#FF6347] font-semibold text-2xl text-center">
            Sarita Baraili
          </h3>
          <p className="p-5 h-[46%] text-center text-[#333333] border-2 border-[#FF6347] rounded-3xl">
            100% partner finder.. wow...Congratulation to all...
          </p>
        </div>
        <div className="relative w-[18%] shadow-xl shadow-gray-300 rounded-3xl h-96 p-[1%]">
          <img className="absolute top-[6%] w-8" src={comment} alt="" />
          <img className="w-[50%] mx-auto mt-[6%]" src={pic2} alt="" />
          <h3 className="mt-[6%] mb-[6%] text-[#FF6347] font-semibold text-2xl text-center">
            Sushila Karki
          </h3>
          <p className="p-5 h-[46%] text-center text-[#333333] border-2 border-[#FF6347] rounded-3xl">
          100% partner finder.. wow...Congratulation to all...
          </p>
        </div>
        <div className="relative w-[18%] shadow-xl shadow-gray-300 rounded-3xl h-96 p-[1%]">
          <img className="absolute top-[6%] w-8" src={comment} alt="" />
          <img className="w-[50%] mx-auto mt-[6%]" src={pic3} alt="" />
          <h3 className="mt-[6%] mb-[6%] text-[#FF6347] font-semibold text-2xl text-center">
            Sita Sharma
          </h3>
          <p className="p-5 h-[46%] text-center text-[#333333] border-2 border-[#FF6347] rounded-3xl">
             100% partner finder.. wow...Congratulation to all...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
