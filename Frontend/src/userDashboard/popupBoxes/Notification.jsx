import React from 'react'
import profilePic from "../../assets/Chat photo.png";
import { IoMdHeart } from "react-icons/io";
import { FaBell } from 'react-icons/fa6';

const Notification = () => {
  return (
    <div className="absolute -left-52 mt-2 p-3 h-[520px] w-80 bg-white border border-gray-300 rounded">
      <h1 className="text-[#F24822] font-bold text-xl ml-1">Notifications</h1>
      <div className="flex items-center gap-x-2 w-full h-12 border-t-[1px] mt-2 border-b-[1px] border-gray-500">
        <FaBell size={24} className="p-0 m-0 text-[#FF3D00]" />
        <p className='text-gray-500 text-[12px] '>
          Welcome to meroBihe community. <br /> Feel free to find a prefect partner for you!
        </p>
      </div>
      
    </div>
  );
}

export default Notification
