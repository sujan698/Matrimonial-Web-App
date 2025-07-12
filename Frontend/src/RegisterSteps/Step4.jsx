import React, { useState } from "react";
import wedding from "../assets/weddingTwo.png";
import mainLogo from "../assets/main-logo.png";
import SelectOptionStep4 from "./SelectOptionStep4";
import { useNavigate } from "react-router-dom";
import load from '../assets/Group 56 (3).png'

const Step4 = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleOptionClick = (label) => {
    if (selectedItems.includes(label)) {
      // If already selected, remove it
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else if (selectedItems.length < 5) {
      // If not selected and less than 5 are selected, add it
      setSelectedItems([...selectedItems, label]);
    } else {
      alert("You can only select up to 5 options!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (selectedItems.length !== 5) {
      alert("Please select exactly 5 interests.");
      return;
    }

    // Get the userId from localStorage or context (assuming it's stored there)
    const userId = localStorage.getItem("userId"); // Replace with your actual userId source

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      // Log the request payload for debugging
      console.log("Sending request with payload:", {
        userId: parseInt(userId, 10),
        interests: selectedItems,
      });

      const response = await fetch("http://localhost:3000/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(userId, 10), // Include userId in the request
          interests: selectedItems, // Include all selected interests
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit interests");
      }

      const data = await response.json();
      console.log("Interests submitted successfully:", data);

      // Navigate to the next step
      navigate("/register/step5");
    } catch (error) {
      console.error("Error submitting interests:", error);
      alert("Failed to submit interests. Please try again.");
    }
  };

  const options = [
    "Animals",
    "Travel",
    "Food",
    "Sports",
    "Art",
    "Movie",
    "Music",
    "Dancing",
    "Singing",
    "Comedy",
    "Beauty",
    "Science",
    "Reading",
    "Technology",
    "Cooking",
    "Fitness",
    "Shopping",
    "Writing",
    "Business",
    "Others",
  ];

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
      id="step1"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <form
        className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl"
        onSubmit={handleSubmit}
      >
        <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
        <img className="absolute top-10 left-[42.8%]" src={load} alt="step1" />
        <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
          You are one step closer...
        </p>
        <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
          Step 4 : Select Your 5 Interests
        </h2>
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
          {options.map((option) => (
            <SelectOptionStep4
              key={option}
              label={option}
              isSelected={selectedItems.includes(option)}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
        <div className="flex justify-around mt-14">
          <button
            className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
            onClick={() => {
              navigate("/register/step3");
            }}
          >
            Back
          </button>
          <button
            className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4;

// import React, { useState } from "react";
// import wedding from "../assets/wedding.jpeg";
// import mainLogo from "../assets/main-logo.png";
// import SelectOptionStep4 from "./SelectOptionStep4";
// import { useNavigate } from "react-router-dom";

// const Step4 = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const navigate = useNavigate();

//   const handleOptionClick = (label) => {
//     if (selectedItems.includes(label)) {
//       // If already selected, remove it
//       setSelectedItems(selectedItems.filter((item) => item !== label));
//     } else if (selectedItems.length < 5) {
//       // If not selected and less than 5 are selected, add it
//       setSelectedItems([...selectedItems, label]);
//     } else {
//       alert("You can only select up to 5 options!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     if (selectedItems.length !== 5) {
//       alert("Please select exactly 5 interests.");
//       return;
//     }

//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       alert("User ID is missing. Please log in again.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/interests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: parseInt(userId, 10), // Include userId in the request
//           interests: selectedItems, // Include selected interests
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit interests");
//       }

//       const data = await response.json();
//       console.log("Interests submitted successfully:", data);

//       // Navigate to the next step
//       navigate("/register/step5");
//     } catch (error) {
//       console.error("Error submitting interests:", error);
//       alert("Failed to submit interests. Please try again.");
//     }
//   };

//   const options = [
//     "Animals",
//     "Travel",
//     "Food",
//     "Sports",
//     "Art",
//     "Movie",
//     "Music",
//     "Dancing",
//     "Singing",
//     "Comedy",
//     "Beauty",
//     "Science",
//     "Reading",
//     "Technology",
//     "Cooking",
//     "Fitness",
//     "Shopping",
//     "Writing",
//     "Business",
//     "Others",
//   ];

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
//         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
//           You are one step closer...
//         </p>
//         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
//           Step 4 : Select Your 5 Interests
//         </h2>
//         <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
//           {options.map((option) => (
//             <SelectOptionStep4
//               key={option}
//               label={option}
//               isSelected={selectedItems.includes(option)}
//               onClick={() => handleOptionClick(option)}
//             />
//           ))}
//         </div>
//         <div className="flex justify-around mt-14">
//           <button
//             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             onClick={() => {
//               navigate("/register/step3");
//             }}
//           >
//             Back
//           </button>
//           <button
//             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             type="submit"
//           >
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step4;

// // import React, { useState } from "react";
// // import wedding from "../assets/wedding.jpeg";
// // import mainLogo from "../assets/main-logo.png";
// // import SelectOptionStep4 from "./SelectOptionStep4";
// // import { useNavigate } from "react-router-dom";

// // const Step4 = () => {
// //   const [selectedItems, setSelectedItems] = useState([]);
// //   const navigate = useNavigate();

// //   const userId= localStorage.getItem("userId")

// //   const handleOptionClick = (label) => {
// //     if (selectedItems.includes(label)) {
// //       // If already selected, remove it
// //       setSelectedItems(selectedItems.filter((item) => item !== label));
// //     } else if (selectedItems.length < 5) {
// //       // If not selected and less than 5 are selected, add it
// //       setSelectedItems([...selectedItems, label]);
// //     } else {
// //       alert("You can only select up to 5 options!");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); // Prevent the default form submission behavior

// //     if (selectedItems.length !== 5) {
// //       alert("Please select exactly 5 interests.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://localhost:3000/interests", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           interests: selectedItems,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to submit interests");
// //       }

// //       const data = await response.json();
// //       console.log("Interests submitted successfully:", data);

// //       // Navigate to the next step
// //       navigate("/register/step5");
// //     } catch (error) {
// //       console.error("Error submitting interests:", error);
// //       alert("Failed to submit interests. Please try again.");
// //     }
// //   };

// //   const options = [
// //     "Animals",
// //     "Travel",
// //     "Food",
// //     "Sports",
// //     "Art",
// //     "Movie",
// //     "Music",
// //     "Dancing",
// //     "Singing",
// //     "Comedy",
// //     "Beauty",
// //     "Science",
// //     "Reading",
// //     "Technology",
// //     "Cooking",
// //     "Fitness",
// //     "Shopping",
// //     "Writing",
// //     "Business",
// //     "Others",
// //   ];

// //   return (
// //     <div
// //       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
// //       id="step1"
// //       style={{ backgroundImage: `url(${wedding})` }}
// //     >
// //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
// //       <form
// //         className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl"
// //         onSubmit={handleSubmit}
// //       >
// //         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
// //         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
// //           You are one step closer...
// //         </p>
// //         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
// //           Step 4 : Select Your 5 Interests
// //         </h2>
// //         <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
// //           {options.map((option) => (
// //             <SelectOptionStep4
// //               key={option}
// //               label={option}
// //               isSelected={selectedItems.includes(option)}
// //               onClick={() => handleOptionClick(option)}
// //             />
// //           ))}
// //         </div>
// //         <div className="flex justify-around mt-14">
// //           <button
// //             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
// //             onClick={() => {
// //               navigate("/register/step3");
// //             }}
// //           >
// //             Back
// //           </button>
// //           <button
// //             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
// //             type="submit"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Step4;

// // import React, { useState } from "react";
// // import wedding from "../assets/wedding.jpeg";
// // import mainLogo from "../assets/main-logo.png";
// // import SelectOptionStep4 from "./SelectOptionStep4";
// // import { useNavigate } from "react-router-dom";

// // const Step4 = () => {
// //   const [selectedItems, setSelectedItems] = useState([]);
// //   const navigate = useNavigate();

// //   const handleOptionClick = (label) => {
// //     if (selectedItems.includes(label)) {
// //       // If already selected, remove it
// //       setSelectedItems(selectedItems.filter((item) => item !== label));
// //     } else if (selectedItems.length < 5) {
// //       // If not selected and less than 5 are selected, add it
// //       setSelectedItems([...selectedItems, label]);
// //     } else {
// //       alert("You can only select up to 5 options!");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); // Prevent the default form submission behavior

// //     if (selectedItems.length !== 5) {
// //       alert("Please select exactly 5 interests.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://your-backend-api-url/interests", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           interests: selectedItems,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to submit interests");
// //       }

// //       const data = await response.json();
// //       console.log("Interests submitted successfully:", data);

// //       // Navigate to the next step
// //       navigate("/register/step5");
// //     } catch (error) {
// //       console.error("Error submitting interests:", error);
// //       alert("Failed to submit interests. Please try again.");
// //     }
// //   };

// //   const options = [
// //     "Animals",
// //     "Travel",
// //     "Food",
// //     "Sports",
// //     "Art",
// //     "Movie",
// //     "Music",
// //     "Dancing",
// //     "Singing",
// //     "Comedy",
// //     "Beauty",
// //     "Science",
// //     "Reading",
// //     "Technology",
// //     "Cooking",
// //     "Fitness",
// //     "Shopping",
// //     "Writing",
// //     "Business",
// //     "Others",
// //   ];

// //   return (
// //     <div
// //       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
// //       id="step1"
// //       style={{ backgroundImage: `url(${wedding})` }}
// //     >
// //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
// //       <form
// //         className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl"
// //         onSubmit={handleSubmit}
// //       >
// //         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
// //         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
// //           You are one step closer...
// //         </p>
// //         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
// //           Step 4 : Select Your 5 Interests
// //         </h2>
// //         <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
// //           {options.map((option) => (
// //             <SelectOptionStep4
// //               key={option}
// //               label={option}
// //               isSelected={selectedItems.includes(option)}
// //               onClick={() => handleOptionClick(option)}
// //             />
// //           ))}
// //         </div>
// //         <div className="flex justify-around mt-14">
// //           <button
// //             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
// //             onClick={() => {
// //               navigate("/register/step3");
// //             }}
// //           >
// //             Back
// //           </button>
// //           <button
// //             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
// //             type="submit"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Step4;

// // // import React, { useState } from 'react'
// // // import wedding from "../assets/wedding.jpeg";
// // // import mainLogo from "../assets/main-logo.png";
// // // import SelectOptionStep4 from './SelectOptionStep4';
// // // import { useNavigate } from 'react-router-dom';

// // // const Step4 = () => {
// // //   const [selectedItems, setSelectedItems] = useState([]);
// // //   const navigate=useNavigate()

// // //   const handleOptionClick = (label) => {
// // //     if (selectedItems.includes(label)) {
// // //       // If already selected, remove it
// // //       setSelectedItems(selectedItems.filter((item) => item !== label));
// // //     } else if (selectedItems.length < 5) {
// // //       // If not selected and less than 5 are selected, add it
// // //       setSelectedItems([...selectedItems, label]);
// // //     } else {
// // //       alert("You can only select up to 5 options!");
// // //     }
// // //   };

// // //   const options = [
// // //     "Animals",
// // //     "Travel",
// // //     "Food",
// // //     "Sports",
// // //     "Art",
// // //     "Movie",
// // //     "Music",
// // //     "Dancing",
// // //     "Singing",
// // //     "Comedy",
// // //     "Beauty",
// // //     "Science",
// // //     "Reading",
// // //     "Technology",
// // //     "Cooking",
// // //     "Fitness",
// // //     "Shopping",
// // //     "Writing",
// // //     "Business",
// // //     "Others",
// // //   ];

// // //   return (
// // //     <div
// // //       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
// // //       id="step1"
// // //       style={{ backgroundImage: `url(${wedding})` }}
// // //     >
// // //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
// // //       <form className="absolute px-28 h-[35em] shadow-lg bg-white w-[60em] rounded-3xl">
// // //         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
// // //         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
// // //           You are one step closer...
// // //         </p>
// // //         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
// // //           Step 4 : Select Your 5 Interests
// // //         </h2>
// // //         <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
// // //           {options.map((option) => (
// // //             <SelectOptionStep4
// // //               key={option}
// // //               label={option}
// // //               isSelected={selectedItems.includes(option)}
// // //               onClick={() => handleOptionClick(option)}
// // //             />
// // //           ))}
// // //         </div>
// // //         <div className="flex justify-around mt-14">
// // //           <button
// // //             className="w-80 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
// // //             onClick={() => {
// // //               navigate("/register/step3");
// // //             }}
// // //           >
// // //             Back
// // //           </button>
// // //           <button
// // //             className="w-80 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
// // //             type="submit"
// // //             onClick={() => {
// // //               navigate("/register/step5");
// // //             }}
// // //           >
// // //             Next
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };
// // // export default Step4;
