import React, { useState } from "react";
import wedding from "../assets/weddingTwo.png";
import mainLogo from "../assets/main-logo.png";
import { BsExclamationTriangleFill } from "react-icons/bs";
import EmptyPhotoComp from "./EmptyPhotoComp";
import { useNavigate } from "react-router-dom";
import load from '../assets/Group 56 (4).png'

const Step5 = () => {
  const [imageBase64, setImageBase64] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (base64Image) => {
    setImageBase64(base64Image); // Set single image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageBase64) {
      alert("Please upload an image!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        userId: parseInt(userId, 10),
        image_url: imageBase64, // Send single image
      };

      const response = await fetch("http://localhost:3000/upload-photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      console.log("Server Response:", data); // Debugging
      console.log("hello")
      navigate("/login");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <form
        className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl"
        onSubmit={handleSubmit}
      >
        <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
        <img className="absolute top-10 left-[42.8%]" src={load} alt="step1" />
        <p className="mb-2 text-lg font-light text-center text-gray-600 mt-14">
          The final step...
        </p>
        <h2 className="text-[#FF6347] font-semibold text-center text-2xl">
          Step 5: Please upload your photo
        </h2>
        <p className="flex items-center justify-center text-sm text-gray-500 gap-x-1">
          <span>
            <BsExclamationTriangleFill />
          </span>
          Make sure your face has been seen clearly for better matches
        </p>

        <div className="flex flex-col items-center justify-center px-5 mt-5 gap-y-4">
          
          
            
            <EmptyPhotoComp onImageUpload={handleImageUpload} />
          
        </div>

        <div className="flex justify-around mt-10">
          <button
            type="button"
            className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
            onClick={() => navigate("/register/step4")}
            disabled={isLoading}
          >
            Back
          </button>
          <button
            type="submit"
            className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step5;

// import React, { useState } from "react";
// import wedding from "../assets/wedding.jpeg";
// import mainLogo from "../assets/main-logo.png";
// import { BsExclamationTriangleFill } from "react-icons/bs";
// import EmptyPhotoComp from "./EmptyPhotoComp";
// import { useNavigate } from "react-router-dom";

// const Step5 = () => {
//   const [imageBase64Array, setImageBase64Array] = useState([]); // Store the base64 images
//   const navigate = useNavigate();

//   const handleImageUpload = (base64Image) => {
//     setImageBase64Array((prevImages) => [...prevImages, base64Image]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (imageBase64Array.length < 3) {
//       alert("Please upload at least 3 images!");
//       return;
//     }
//     const userId =localStorage.getItem("userId")

//     // Send the base64 images to the backend
//     try {
//       const response = await fetch("http://localhost:3000/upload-photos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: parseInt(userId, 10),
//           base64Images: imageBase64Array,
//         }),
//       });
//       navigate("/dashboard")
//       const data = await response.json();
//       console.log("Server Response:", data);
//     } catch (error) {
//       console.error("Error uploading images:", error);
//     }
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
//       id="step1"
//       style={{ backgroundImage: `url(${wedding})` }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
//       <form
//         className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl"
//         onSubmit={handleSubmit}
//       >
//         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
//         <p className="mb-2 text-lg font-light text-center text-gray-600 mt-14">
//           The final step...
//         </p>
//         <h2 className="text-[#FF6347] font-semibold text-center text-2xl ">
//           Step 5 : Please upload at least 3 pictures
//         </h2>
//         <p className="flex items-center justify-center text-sm text-gray-500 gap-x-1">
//           <span>
//             <BsExclamationTriangleFill />
//           </span>
//           Make sure your face has been seen clearly for better matches
//         </p>
//         {/* Photos goes here */}
//         <div className="flex flex-col items-center justify-center px-5 mt-5 gap-x-20 gap-y-4">
//           <div className="flex gap-x-24">
//             <EmptyPhotoComp onImageUpload={handleImageUpload} />
//             <EmptyPhotoComp onImageUpload={handleImageUpload} />
//           </div>
//           <div className="flex gap-x-24">
//             <EmptyPhotoComp onImageUpload={handleImageUpload} />
//             <EmptyPhotoComp onImageUpload={handleImageUpload} />
//           </div>
//         </div>

//         <div className="flex justify-around mt-10">
//           <button
//             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             onClick={() => {
//               navigate("/register/step4");
//             }}
//           >
//             Back
//           </button>
//           <button
//             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             type="submit"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step5;

// import React from 'react'
// import wedding from "../assets/wedding.jpeg";
// import mainLogo from "../assets/main-logo.png";
// import { BsExclamationTriangleFill } from 'react-icons/bs';
// import EmptyPhotoComp from './EmptyPhotoComp';
// import { useNavigate } from 'react-router-dom';

// const Step5 = () => {
//    const navigate= useNavigate()
//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
//       id="step1"
//       style={{ backgroundImage: `url(${wedding})` }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
//       <form className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl">
//         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
//         <p className="mb-2 text-lg font-light text-center text-gray-600 mt-14">
//           The final step...
//         </p>
//         <h2 className="text-[#FF6347] font-semibold text-center text-2xl ">
//           Step 5 : Please upload atleast 3 pictures
//         </h2>
//         <p className="flex items-center justify-center text-sm text-gray-500 gap-x-1">
//           <span>
//             <BsExclamationTriangleFill />
//           </span>
//           Make sure your face has been seen clearly for better matches
//         </p>
//         {/* Photos goes here  */}
//         <div className="flex flex-col items-center justify-center px-5 mt-5 gap-x-20 gap-y-4">
//           <div className="flex gap-x-24">
//             <EmptyPhotoComp />
//             <EmptyPhotoComp />
//           </div>
//           <div className="flex gap-x-24">
//             <EmptyPhotoComp />
//             <EmptyPhotoComp />
//           </div>
//         </div>

//         <div className="flex justify-around mt-10">
//           <button
//             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             onClick={() => {
//               navigate("/register/step4");
//             }}
//           >
//             Back
//           </button>
//           <button
//             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             type="submit"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Step5
