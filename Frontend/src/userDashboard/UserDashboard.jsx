import React, { useEffect, useState } from "react";
import mainLogo from "../assets/main-logo.png";
import wedding from "../assets/weddingTwo.png";
import { RiHeartsFill } from "react-icons/ri";
import { FaBell, FaLocationDot, FaUserGroup } from "react-icons/fa6";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoMdHeart, IoMdOptions } from "react-icons/io";
import photo from "../assets/Rectangle 100.png";
import { HiMiniXMark } from "react-icons/hi2";
import InterestComponent from "./InterestComponent";
import PersonalIdentity from "./PersonalIdentity";
import { PiBowlFoodFill } from "react-icons/pi";
import MySection from "./MySection";
import PopupChatbox from "../userDashboard/popupBoxes/PopupChatbox";
import PopupMatchbox from "./popupBoxes/PopupMatchbox";
import PopupLikes from "./popupBoxes/PopupLikes";
import Notification from "./popupBoxes/Notification";
import ReportPopup from "./popupBoxes/ReportPopup";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router";
import { useChat } from "../context/chatContext";

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [matches, setMatches] = useState([]); 
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0); 
  const [loadingMatches, setLoadingMatches] = useState(false); 
  const navigate = useNavigate();
  const { onlineUsers, setSelectedMatch } = useChat();
  const [popupMatches, setPopupMatches] = useState([]);
  const [likes, setLikes] = useState([]);

  const fetchLikes = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData?.id;
  
      if (!userId) {
        console.error("User ID is not available");
        return;
      }
  
      const response = await axios.get(`http://localhost:3000/likes/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Likes",likes)
  
      setLikes(response.data); // Update the state with the fetched likes
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  
  const handleHeartsClick = () => {
    fetchLikes(); // Fetch likes data
    handleClick("hearts"); // Toggle the PopupLikes component
  };

  const fetchPopupMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData?.id;

      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      const response = await axios.get(`http://localhost:3000/matches/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Popup matches:", response.data);
      setPopupMatches(response.data);
    } catch (error) {
      console.error("Error fetching popup matches:", error);
    }
  };

  const handleGroupClick = () => {
    fetchPopupMatches();
    handleClick("group");
  };

  // Fetch user profile and matches
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUserData(storedUser);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }

        const response = await axios.get(`http://localhost:3000/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchMatches = async () => {
      if (!userData?.id) return;

      setLoadingMatches(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/matching/${userData.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response.data);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoadingMatches(false);
      }
    };



    fetchMatches();
  }, [userData?.id]);

  
  // Handle swipe (next match)
  const handleSwipe = () => {
    setCurrentMatchIndex((prev) => prev + 1);
  };
  //handle like
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const likedId = matches[currentMatchIndex]?.id; // ID of the user being liked
      const userId = userData?.id; // ID of the logged-in user

      if (!likedId || !userId) {
        console.error("Invalid user ID or liked ID");
        return;
      }

      // Send a POST request to the backend to like the user
      const likeResponse = await axios.post(
        `http://localhost:3000/likes`,
        { userId, likedId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Like successful:", likeResponse.data);

      // Fetch the notification sent to the liked user
      const notificationResponse = await axios.get(
        `http://localhost:3000/notifications/${likedId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Notification sent:", notificationResponse.data);

      // Move to the next match after liking
      handleSwipe();
    } catch (error) {
      console.error("Error liking user or fetching notification:", error);
    }
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Toggle popup components

  const handleClick = (component) => {
    setActiveComponent((prev) => (prev === component ? null : component));
  };

  // Current match data
  const currentMatch = matches[currentMatchIndex];

  return (
    <div className="flex flex-col h-screen font-outfit" id="dashboard">
      <nav className="z-10 bg-white w-full flex items-center justify-center h-[12%]">
        <img
          src={mainLogo}
          className="w-20 pl-3 cursor-pointer"
          alt="logo"
          onClick={() => (window.location.href = "/dashboard")}
        />

        <div className="flex items-center justify-end pr-8 gap-x-12 w-[85%]">
          <div className="relative">
            <BiMessageRoundedDetail
              className={`text-2xl ${activeComponent === "message" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={() => handleClick("message")}
            />
            {activeComponent === "message" && (
              <PopupChatbox
                // currentUserId={userData?.id}
                matches={matches}
                onSelectMatch={setSelectedMatch}
              // onlineUsers={onlineUsers}
              />
            )}
          </div>

          <div className="relative">
            <FaUserGroup
              className={`text-2xl ${activeComponent === "group" ? "text-black" : "text-[#F24822]"
                }`}
              onClick={handleGroupClick}

            />
            {activeComponent === "group" && <PopupMatchbox matches={popupMatches} />}
          </div>

          <div className="relative">
            <RiHeartsFill
              className={`text-2xl ${activeComponent === "hearts" ? "text-black" : "text-[#F24822]"
                }`}
                onClick={handleHeartsClick}
            />
            {activeComponent === "hearts" && <PopupLikes likes={likes} />}
          </div>

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

      {/* Background Picture */}
      <div className="relative w-full h-[100%] overflow-hidden">
        <img className="w-full" src={wedding} alt="wedding" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>

      {/* Main Section to View */}
      <div className="absolute flex justify-around items-center bg-transparent left-44 top-[16%] w-[80%] h-[32em]">
        <div className="bg-white w-[25%] rounded-3xl h-full">
          <MySection data={userData} />
        </div>

        {/* Dashboard with Picture */}
        <div className="relative bg-white w-[50em] rounded-3xl h-full">
          <IoMdOptions onClick={()=>navigate('/profile/edit')} className="absolute left-[5%] top-5 text-4xl text-[#F24822]" />
          <ReportPopup currentUserId={currentMatch?.id}
            onReportSubmit={handleSwipe} />

          <div className="flex flex-col gap-y-4">
            {/* Profile Photo and Buttons */}
            <div className="flex items-center justify-center w-full gap-12 mt-20">
              {loadingMatches ? (
                <div className="text-center">Loading matches...</div>
              ) : currentMatch ? (
                <>
                  <div className="flex items-center justify-center w-24 h-24 transition-all duration-300 rounded-full shadow-xl hover:scale-105 hover:shadow-lg group">
                    <HiMiniXMark
                      className="text-gray-500 transition-all duration-300 cursor-pointer text-7xl hover:text-red-500 hover:scale-110"
                      onClick={handleSwipe}
                    />
                  </div>
                  <div
                    id="photo"
                    className="flex items-center justify-center overflow-hidden border-2 border-orange-600 rounded-xl h-60 w-44"
                  >
                    <img
                      src={currentMatch?.UploadPhoto?.[0]?.image_url}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* <div id="photo" className="flex items-center justify-center border-2 border-orange-600 rounded-xl h-60">
                    <img
                      src={currentMatch?.UploadPhoto?.[0]?.image_url}
                      alt=""
                      className="w-44"
                    />
                  </div> */}
                  <div className="flex items-center justify-center w-24 h-24 transition-all duration-300 rounded-full shadow-xl hover:scale-105 hover:shadow-lg group">
                    <IoMdHeart
                      className="text-7xl text-[#F24822] cursor-pointer"
                      onClick={handleLike}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center mt-28">
                  No more matches to show.
                </div>
              )}
            </div>

            {/* Name and Age */}
            <h1 className="text-3xl text-[#F24822] font-semibold text-center">
              {currentMatch?.fullname}{" "}
              <span className="text-3xl font-semibold text-black">
                {"- "}
                {calculateAge(currentMatch?.dob)}
              </span>
            </h1>

            {/* Interests */}
            <div className="flex justify-center gap-x-2">
              {currentMatch?.Interest?.slice(0, 5).map((interest, index) => (
                <InterestComponent key={index} name={interest.interest} />
              ))}
            </div>

            {/* Personal Identities */}
            <div className="absolute flex justify-center text-gray-700 gap-x-6 bottom-10 left-36">
              <PersonalIdentity
                icon=<FaLocationDot />
                name={
                  currentMatch?.DemographicDetails?.[0]?.district?.name ||
                  "No Data"
                }
              />
              <PersonalIdentity
                icon=<GoDotFill />
                name={
                  currentMatch?.DemographicDetails?.[0]?.employmentStatus ||
                  "No Data"
                }
              />
              <PersonalIdentity
                icon=<GoDotFill />
                name={
                  currentMatch?.DemographicDetails?.[0]?.maritalStatus ||
                  "No Data"
                }
              />
              <PersonalIdentity
                icon=<GoDotFill />
                name={currentMatch?.FamilyDetails?.[0]?.religion || "No Data"}
              />
              <PersonalIdentity
                icon=<GoDotFill />
                name={
                  currentMatch?.DemographicDetails?.[0]?.dietPreference ||
                  "No Data"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
