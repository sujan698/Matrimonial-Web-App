import React, { useEffect, useState } from "react";
import wedding from "../assets/wedding.jpeg";
import mainLogo from "../assets/main-logo.png";
import SelectComponent from "./SelectComponent";
import TableComponent from "./TableComponent";
import { data } from "./maindata.js";
import axios from "axios";
import { useNavigate } from "react-router";
import Personal from "./editcomponent/Personal.jsx";
import AccountSetting from "./editcomponent/AccountSetting.jsx";
import Photo from "./editcomponent/Photo.jsx";
import Peference from "./editcomponent/Peference.jsx";
import Matchmaking from "./editcomponent/Matchmaking.jsx";
import Demographic from "./editcomponent/Demographic.jsx";

const EditDashboard = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("personalInfo");
  const [profileData, setProfileData] = useState({}); // Store fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const response = await axios.get("http://localhost:3000/auth/profile",{
          headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setProfileData(response.data?.[0]); 
        console.log(response.data?.[0])
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const renderComponent = () => {
    switch (selectedCategory) {
      case "personalInfo":
        return <Personal profileData={profileData} />;
      case "demographicDetails":
        return <Demographic profileData={profileData} />;
      case "matchmakingDetails":
        return <Matchmaking profileData={profileData} />;
      case "preferences":
        return <Peference profileData={profileData} />;
      case "photos":
        return <Photo />;
      case "accountSetting":
        return <AccountSetting />;
      default:
        return <Personal />; // Default component
    }
  };


  return (
    <div className="flex flex-col h-screen font-outfit" id="dashboard">
      <nav className="absolute z-10 bg-white w-full flex items-center justify-center h-[12%]">
        <img src={mainLogo} className="w-20 pl-3" alt="logo" />

        <div className="flex items-center justify-end pr-8 gap-x-12 w-[85%]"></div>
      </nav>
      <div className="relative w-full h-[100%] overflow-hidden ">
        <img className="w-full " src={wedding} alt="wedding" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>

      {/* White box */}
      <div className="absolute flex justify-around items-center bg-transparent left-44 top-[16%] w-[80%] h-[32em]  ">
        <div className=" bg-white w-[25%] rounded-3xl h-full pt-8">
          <h1 className="text-[#F24822] text-3xl font-semibold border-b-2 text-center">
            Edit Profile
          </h1>
          <div className="flex flex-col pt-6 text-center">
            <button onClick={() => setSelectedCategory("personalInfo")}>
              <SelectComponent name="Personal Info" />
            </button>
            <button onClick={() => setSelectedCategory("demographicDetails")}>
              <SelectComponent name="Demographic Details" />
            </button>
            <button onClick={() => setSelectedCategory("matchmakingDetails")}>
              <SelectComponent name="Family Details" />
            </button>
            <button onClick={() => setSelectedCategory("preferences")}>
              <SelectComponent name="Preferences" />
            </button>
            <button onClick={() => setSelectedCategory("photos")}>
              <SelectComponent name="Photos" />
            </button>
            <button>
              <SelectComponent name="Account Setting" />
            </button>
            <div>
              <button onClick={()=>{navigate('/dashboard')}} className="border-2 border-[#F24822] px-8 py-2 rounded-lg text-[#F24822] font-extrabold mt-6">
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Large white box with table */}

        <div className="relative bg-white w-[50em] rounded-3xl h-full flex justify-center items-center">
          {/* <TableComponent data={profileData[selectedCategory] || []} /> */}
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default EditDashboard;
