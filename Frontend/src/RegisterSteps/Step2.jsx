import React, { useState } from "react";
import wedding from "../assets/weddingTwo.png";
import mainLogo from "../assets/main-logo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { optionsEthnicity, optionsFamily, optionsFamilyClass, optionsFamilyValues, optionsReligion } from "./options/option";
import load from '../assets/Group 56 (1).png'


const Step2 = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId: userId ? parseInt(userId) : null, // Include userId in formData
    ethnicity: null,
    familyValues: null,
    familyClass: null,
    familyType: null,
    religion: null,
    gotra: "",
  });

  const handleSelectChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value?.value || null,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://localhost:3000/familydetails",
        formData,
      );

      console.log("Data sent successfully:", response.data);

      // Navigate to the next step
      navigate("/register/step3");
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response?.data?.message || error.message
      );
      alert("An error occurred while submitting the form.");
    }
  };

  

  

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
      id="step1"
      style={{ backgroundImage: `url(${wedding})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
      <form
        className="absolute px-28 h-[35em] shadow-lg bg-white w-[50em] rounded-3xl"
        onSubmit={handleSubmit}
      >
        <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
        <img className="absolute top-10 left-[42.8%]" src={load} alt="step1" />
        <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
          Setting up your profile
        </p>
        <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
          Step 2: Family Details
        </h2>
        <div className="flex flex-wrap justify-center gap-10 gap-x-16">
          <Select
            className="w-60"
            placeholder="Religion"
            options={optionsReligion}
            onChange={(value) => handleSelectChange(value, "religion")}
          />
          <Select
            className="w-60"
            placeholder="Ethnicity"
            options={optionsEthnicity}
            onChange={(value) => handleSelectChange(value, "ethnicity")}
          />
          <Select
            className="w-60"
            placeholder="Family Class"
            options={optionsFamilyClass}
            onChange={(value) => handleSelectChange(value, "familyClass")}
          />
          <input
            type="text"
            className="pl-2 border-2 border-gray-300 rounded-md w-60"
            placeholder="Gotra"
            name="gotra"
            value={formData.gotra}
            onChange={handleInputChange}
          />
          <Select
            className="w-60"
            placeholder="Family Type"
            options={optionsFamily}
            onChange={(value) => handleSelectChange(value, "familyType")}
          />
          <Select
            className="w-60"
            placeholder="Family Values"
            options={optionsFamilyValues}
            onChange={(value) => handleSelectChange(value, "familyValues")}
          />
        </div>
        <div className="flex justify-around mt-14 gap-x-4">
          <button
            className="w-72 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
            type="button"
            onClick={() => {
              navigate("/register/step1");
            }}
          >
            Back
          </button>
          <button
            className="w-72 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;

// import React from 'react'
// import wedding from "../assets/wedding.jpeg";
// import mainLogo from "../assets/main-logo.png";
// import Select from "react-select";
// import { useNavigate } from 'react-router-dom';

// const Step2 = () => {
//     const navigate = useNavigate();
//     const userId= localStorage.getItem("userId");

//     const optionsFamilyValues = [
//       { value: "Traditional", label: "Traditional" },
//       { value: "Modern", label: "Modern" },
//       { value: "Liberal", label: "Liberal" },
//       { value: "NoPreference", label: "No Preference" },
//     ];
//     const optionsFamilyClass = [
//     { value: "MiddleClass", label: "Middle Class" },
//     { value: "UpperClass", label: "Upper Class" },
//     { value: "LowerClass", label: "Lower Class" },
//     { value: "NoPreference", label: "No Preference" },
//   ];
//     const optionsFamily = [
//       { value: "Nuclear", label: "Nuclear" },
//       { value: "Joint", label: "Joint" },
//       { value: "Extended", label: "Extended" },
//     ];

//     const optionsEthnicity = [
//       { value: "Brahmin", label: "Brahmin" },
//       { value: "Chhetri", label: "Chhetri" },
//       { value: "Newar", label: "Newar" },
//       { value: "Gurung", label: "Gurung" },
//       { value: "Magar", label: "Magar" },
//       { value: "Rai", label: "Rai" },
//       { value: "Limbu", label: "Limbu" },
//       { value: "Tamang", label: "Tamang" },
//       { value: "Sherpa", label: "Sherpa" },
//       { value: "Thakuri", label: "Thakuri" },
//       { value: "Dalit", label: "Dalit" },
//       { value: "Madhesi", label: "Madhesi" },
//       { value: "Janajati", label: "Janajati" },
//       { value: "Others", label: "Others" },
//       { value: "NoPreference", label: "No Preference" },
//     ];
//     const optionsReligion = [
//       { value: "hinduism", label: "Hindu" },
//       { value: "islam", label: "Muslim" },
//       { value: "buddhism", label: "Buddhist" },
//       { value: "christianity", label: "Christain" },
//       { value: "others", label: "Others" },
//     ];
//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
//       id="step1"
//       style={{ backgroundImage: `url(${wedding})` }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
//       <form className="absolute px-28 h-[35em] shadow-lg bg-white w-[50em] rounded-3xl">
//         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
//         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
//           Setting up your profile
//         </p>
//         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
//           Step 2: Family Details
//         </h2>
//         <div className="flex flex-wrap justify-center gap-10 gap-x-16">
//           <Select
//             className="w-60"
//             placeholder="Religion"
//             options={optionsReligion}
//           />
//           <Select
//             className="w-60"
//             placeholder="Ethnicity"
//             options={optionsEthnicity}
//           />
//           <Select
//             className="w-60"
//             placeholder="Family Class"
//             options={optionsFamilyClass}
//           />
//           <input
//             type="text"
//             className="pl-2 border-2 border-gray-300 rounded-md w-60 "
//             placeholder="Gotra"
//           />
//           <Select
//             className="w-60"
//             placeholder="Family Type"
//             options={optionsFamily}
//           />
//           <Select
//             className="w-60"
//             placeholder="Family Values"
//             options={optionsFamilyValues}
//           />
//         </div>
//         <div className="flex justify-around mt-14 gap-x-4">
//           <button
//             className="w-72 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             onClick={() => {
//               navigate("/register/step1");
//             }}
//           >
//             Back
//           </button>
//           <button
//             className="w-72 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             type="submit"
//             onClick={() => {
//               navigate("/register/step3");
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Step2
