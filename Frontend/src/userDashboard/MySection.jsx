import React from "react";
import myPhoto from "../assets/Ellipse 4.png";
import PersonalIdentity from "./PersonalIdentity";
import { GiBodyHeight } from "react-icons/gi";
import {
  FaLocationDot,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

const MySection = ({ data }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem("token"); 
  navigate("/login"); 
};

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div>
      <div className="border-2 border-[#F24822] rounded-full w-16 h-16 mx-auto mt-4 overflow-hidden">
        <img
          className="object-cover w-full h-full rounded-full"
          src={data?.UploadPhoto?.[0]?.image_url}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-start mt-2 px-14">
        <h1 className="text-xl font-semibold">Hi {data?.fullname}!</h1>
        <div className="w-full space-y-2">
          <div className="flex justify-start w-full ">
            <div className="text-gray-500 ">
              Age - {data?.dob ? calculateAge(data?.dob) : ""}
            </div>
          </div>
          <p onClick={()=>{navigate('/profile/edit')}} className="text-[#F24822] font-semibold border-b-2 border-gray-400 pb-2 cursor-pointer">
            Edit Profile
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start w-full px-12 py-3 leading-9 text-gray-500">
        <PersonalIdentity
          icon=<FaLocationDot />
          name={data?.DemographicDetails?.[0]?.district?.name}
        />
        <PersonalIdentity
          icon=<GiBodyHeight />
          name={data?.DemographicDetails?.[0]?.height}
        />
        <PersonalIdentity
          icon=<GoDotFill />
          name={data?.DemographicDetails?.[0]?.educationLevel}
        />
        <PersonalIdentity
          icon=<GoDotFill />
          name={data?.DemographicDetails?.[0]?.maritalStatus}
        />
        <PersonalIdentity
          icon=<GoDotFill />
          name={data?.FamilyDetails?.[0]?.religion}
        />
        <PersonalIdentity
          icon=<GoDotFill />
          name={data?.DemographicDetails?.[0]?.dietPreference}
        />
      </div>
      <div className="flex justify-center">
        <button
          className=" border-[#F24822] border-2 text-[#F24822] font-extrabold rounded-lg py-1 px-6"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MySection;
