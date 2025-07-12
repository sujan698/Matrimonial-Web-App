import React from "react";
import logo from "../assets/main-logo.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* Clicking logo will reload the page and navigate to home */}
      <img
        src={logo}
        className="w-20 pl-3 cursor-pointer"
        alt="logo"
        onClick={() => (window.location.href = "/")}
      />
      <div className="flex items-center justify-end">
        <ul className="flex space-x-12 text-[#333333] font-bold mr-12">
          <li className="cursor-pointer hover:underline">
            <Link to="about" smooth={true} offset={-50} duration={500}>
              About
            </Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to="features" smooth={true} offset={-50} duration={500}>
              Features
            </Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to="testimonials" smooth={true} offset={-50} duration={600}>
              Testimonials
            </Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to="contact" smooth={true} offset={-50} duration={700}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="mr-5">
          <button
            onClick={handleLogin}
            className="bg-[#FF6347] rounded-xl text-white font-extrabold w-[156px] h-[48px] hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
