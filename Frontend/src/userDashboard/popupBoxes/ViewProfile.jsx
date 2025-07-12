import React, { useEffect, useState } from 'react'
import ReportPopup from './ReportPopup'
import InterestComponent from '../InterestComponent'
import PersonalIdentity from '../PersonalIdentity'
import { FaBell, FaSmoking, FaUser, FaUserGraduate } from 'react-icons/fa'
import { PiBowlFoodFill } from 'react-icons/pi'
import photo from "../../assets/Rectangle 100.png";
import { BiMessageRoundedDetail } from 'react-icons/bi'
import PopupChatbox from './PopupChatbox'
import { FaUserGroup } from 'react-icons/fa6'
import PopupMatchbox from './popupMatchbox'
import { RiHeartsFill } from 'react-icons/ri'
import PopupLikes from './PopupLikes'
import Notification from './Notification'
import mainLogo from "../../assets/main-logo.png";
import wedding from "../../assets/wedding.jpeg";
import MySection from '../MySection'
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios'
import { GoDotFill } from 'react-icons/go'

const ViewProfile = () => {
  const [activeComponent, setActiveComponent] = useState(null); // Tracks the active component

  const [isBoxVisible, setIsBoxVisible] = useState(false);

    const [userData, setUserData]= useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

  const toggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

    const handleClick = (component) => {
      setActiveComponent((prev) => (prev === component ? null : component)); // Toggle the same component or activate a new one
    };
    useEffect(() => {
      const fetchProfileData = async () => {
        const token = localStorage.getItem("token")
        try {
          const response = await axios.get(
            "http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
          setUserData(response.data); // Set the user data in state
          console.log(response.data); // Log the data to the console
        } catch (err) {
          setError(err); // Set error state if the request fails
          console.error("Error fetching profile data:", err);
        } finally {
          setLoading(false); // Set loading to false after the request completes
        }
      };

      fetchProfileData();
    }, []);

    if (loading) {
      return <div>Loading...</div>; 
    }

    if (error) {
      return <div>Error: {error.message}</div>; 
    }
   

  return (
    <div className="flex flex-col h-screen font-outfit" id="dashboard">
      <nav className="z-10 bg-white w-full flex items-center justify-center h-[12%]">
        <img src={mainLogo} className="w-20 pl-3" alt="logo" />

        <div className="flex items-center justify-end pr-8 gap-x-12 w-[85%]">
          {/* BiMessageRoundedDetail */}
          <div className="relative">
            <BiMessageRoundedDetail
              className={`text-2xl ${activeComponent === "message" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={() => handleClick("message")}
            />
            {activeComponent === "message" && <PopupChatbox />}
          </div>

          {/* FaUserGroup */}
          <div className="relative">
            <FaUserGroup
              className={`text-2xl ${activeComponent === "group" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={() => handleClick("group")}
            />
            {activeComponent === "group" && <PopupMatchbox />}
          </div>

          {/* RiHeartsFill */}
          <div className="relative">
            <RiHeartsFill
              className={`text-2xl ${activeComponent === "hearts" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={() => handleClick("hearts")}
            />
            {activeComponent === "hearts" && <PopupLikes />}
          </div>

          {/* FaBell */}
          <div className="relative">
            <FaBell
              className={`text-2xl ${activeComponent === "bell" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={() => handleClick("bell")}
            />
            {activeComponent === "bell" && <Notification />}
          </div>
        </div>
      </nav>
      {/* Background Picture  */}
      <div className="relative w-full h-[100%] overflow-hidden ">
        <img className="w-full " src={wedding} alt="wedding" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      {/* main Section to view  */}

      <div className="absolute flex justify-around items-center bg-transparent left-44 top-[16%] w-[80%] h-[32em]  ">
        {/* <div className=" bg-white w-[25%] rounded-3xl h-full">
          <MySection />
        </div> */}
        {/* Dashboard with picture  */}

        <div className="relative bg-white w-[50em] rounded-3xl h-full">
          <MdKeyboardArrowLeft
            size={45}
            className="absolute mt-4 left-5 text-[#FF3D00]"
          />
          <ReportPopup />
          <div className="flex pt-16 ml-16">
            <div id="photo">
              <img
                src={userData?.[0]?.UploadPhoto?.[0]?.image_url}
                alt=""
                className="w-28"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-semibold text-[#FF6347]">
                {userData?.[0]?.fullname}
              </h1>
              <div className="flex items-center mt-3">
                <p className="mr-10 text-2xl font-semibold">
                  {userData?.[0]?.dob ? calculateAge(userData?.[0]?.dob) : "-"} yrs
                </p>
                <button className="bg-[#FF3D00] text-white mr-5 px-8 py-2 rounded-xl  hover:bg-white hover:text-rose-950 hover:border-[1px] hover:border-rose-950">
                  Like Back
                </button>
                <button className="border-2 text-[#FF3D00] border-[#F24822] px-8 py-2 rounded-xl">
                  Message
                </button>
              </div>
              <div className="flex w-[32em] mt-4 gap-x-2 gap-y-4">
                {userData?.[0]?.Interest?.slice(0, 5).map((interest, index) => (
                  <InterestComponent key={index} name={interest.interest} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-48 text-gray-700 gap-x-6">
            <PersonalIdentity icon=<GoDotFill /> name="Student" />
            <PersonalIdentity icon=<GoDotFill /> name="Single" />
            <PersonalIdentity icon=<GoDotFill /> name="Hindu" />
            <PersonalIdentity icon=<GoDotFill /> name="Non-Veg" />
            <PersonalIdentity icon=<GoDotFill /> name="Smoker" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile