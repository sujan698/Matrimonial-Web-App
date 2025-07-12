import React from 'react'
import profilePic from "../../../assets/Chat photo.png";
import { IoMdHeart } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa6';

const LikesComp = ({ like }) => {
  console.log("final like:", like)
  return (
    <div className="flex items-center gap-x-4 hover:bg-gray-100 py-2 ">
      <FaHeart className="text-[#FF3D00]" />
      <div className="flex items-center gap">
        {/* <IoMdHeart className="p-0 m-0 text-[#FF3D00]" /> */}
        <h3 className="text-[14px] w-[15em]">
          {like?.user?.fullname}{" "}
          <span className="font-medium">liked you</span>
        </h3>
        <div className=" flex justify-center items-center rounded-full bg-[#FF3D00] text-white text-[12px] w-24 h-8 ">
          View Profile
        </div>
      </div>
    </div>
    
  );
}

export default LikesComp