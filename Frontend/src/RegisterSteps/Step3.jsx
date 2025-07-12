import React, { useState } from "react";
import wedding from "../assets/weddingTwo.png";
import mainLogo from "../assets/main-logo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { optionsAgeP, optionsDietP, optionsEducationalP, optionsEmploymentP, optionsEthnicityP, optionsFamilyClassP, optionsFamilyValuesP, optionsMaritalP, optionsReligionP, optionsResidentialP } from "./options/option";
import load from '../assets/Group 56 (2).png'

const Step3 = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId: userId ? parseInt(userId) : null,
    maritalStatus: null,
    ageRange: null,
    dietPreference: null,
    religion: null,
    familyValues: null,
    ethnicity: null,
    familyClass: null,
    residentialStatus: null,
    employmentStatus: null,
    educationLevel: null,
  });

  const handleSelectChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value?.value || null,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Debugging line

    try {
      const response = await axios.post(
        "http://localhost:3000/partner-preferences",
        formData
      );

      console.log("Data sent successfully:", response.data);

      // Navigate to the next step
      navigate("/register/step4");
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
          You’re now few steps closer..
        </p>
        <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
          Step 3 : Personal Preferences for Matches
        </h2>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
          <Select
            className="w-60"
            placeholder="Marital Status"
            options={optionsMaritalP}
            onChange={(value) => handleSelectChange(value, "maritalStatus")}
          />
          <Select
            className="w-60"
            placeholder="Age Range"
            options={optionsAgeP}
            onChange={(value) => handleSelectChange(value, "ageRange")}
          />
          <Select
            className="w-60"
            placeholder="Diet Preferences"
            options={optionsDietP}
            onChange={(value) => handleSelectChange(value, "dietPreference")}
          />
          <Select
            className="w-60"
            placeholder="Religion"
            options={optionsReligionP}
            onChange={(value) => handleSelectChange(value, "religion")}
          />
          <Select
            className="w-60"
            placeholder="Ethnicity"
            options={optionsEthnicityP}
            onChange={(value) => handleSelectChange(value, "ethnicity")}
          />
          <Select
            className="w-60"
            placeholder="Family Class"
            options={optionsFamilyClassP}
            onChange={(value) => handleSelectChange(value, "familyClass")}
          />
          <Select
            className="w-60"
            placeholder="Education Level"
            options={optionsEducationalP}
            onChange={(value) => handleSelectChange(value, "educationLevel")}
          />
          <Select
            className="w-60"
            placeholder="Employment Status"
            options={optionsEmploymentP}
            onChange={(value) => handleSelectChange(value, "employmentStatus")}
          />
          <Select
            className="w-60"
            placeholder="Residential Status"
            options={optionsResidentialP}
            onChange={(value) => handleSelectChange(value, "residentialStatus")}
          />
          <Select
            className="w-60"
            placeholder="Family Values"
            options={optionsFamilyValuesP}
            onChange={(value) => handleSelectChange(value, "familyValues")}
          />
        </div>
        <div className="flex justify-around mt-8 gap-x-4">
          <button
            className="w-72 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
            onClick={() => {
              navigate("/register/step2");
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

export default Step3;

// import React, { useState } from "react";
// import wedding from "../assets/wedding.jpeg";
// import mainLogo from "../assets/main-logo.png";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Step3 = () => {
// const navigate=useNavigate()

// const userId= localStorage.getItem("userId");

// const [formData, setFormData] = useState({
//   userId: userId ? parseInt(userId) : null,
//   maritalStatus: null,
//   ageRange: null,
//   dietPreference: null,
//   religion:null,
//   familyValues:null,
//   ethnicity:null,
//   familyClass:null,
//   residentialStatus:null,
//   employmentStatus:null,
//   educationLevel:null,
// });

// const handleSelectChange = (value, field) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     [field]: value?.value || null,
//   }));
// };

//   const optionsMarital = [
//     { value: "single", label: "Single" },
//     { value: "divorced", label: "Divorced" },
//     { value: "widowed", label: "Widowed" },
//   ];

//   const optionsReligion = [
//     { value: "hindu", label: "Hindu" },
//     { value: "muslim", label: "Muslim" },
//     { value: "buddhist", label: "Buddhist" },
//     { value: "christain", label: "Christain" },
//     { value: "others", label: "Others" },
//     { value: "no-peference", label: "No Preference" },
//   ];

//   const optionsEmployment = [
//     { value: "Employed", label: "Employed" },
//     { value: "SelfEmployed", label: "Self-Employed" },
//     { value: "Student", label: "Student" },
//     { value: "Unemployed", label: "UnEmployed" },
//     { value: "Retired", label: "Retired" },
//     {value: "NoPreference", label:"No Preference"},
//   ];

//   const optionsDiet = [
//       { value: "Veg", label: "Veg" },
//       { value: "NonVeg", label: "Non-Veg" },
//       { value: "Eggiterian", label: "Eggiterian" },
//       { value: "Vegan", label: "Vegan" },
//       { value: "NoPreference", label: "No Preference" },
//     ];
//   const optionsAge = [
//     { value: 20, label: "18-28" },
//     { value: 30, label: "29-44" },
//     { value: 40, label: "25-60" },
//     { value: 50, label: "60 above" },
//     { value: 0, label: "No Preference" },
//   ];

//   const optionsResidential = [
//     { value: "NepaliCitizen", label: "NepaliCitizen" },
//     { value: "PRHolder", label: "PRHolder" },
//     { value: "NRN", label: "NRN" },
//     {value: "NoPreference", label:"No Preference"}
//   ];

//   const optionsEducational = [
//     { value: "PrimaryLevel", label: "Primary " },
//     { value: "SecondaryLevel", label: "Secondary" },
//     { value: "HigherSecondaryLevel", label: "Higher Secondary" },
//     { value: "Bachelor", label: "Bachelor's Degree" },
//     { value: "Masters", label: "Master's Degree" },
//     { value: "PhD", label: "PhD" },
//     { value: "Diploma", label: "Diploma" },
//     { value: "NoPreference", label: "No Preference" },
//   ];

//   const optionsFamilyClass = [
//     { value: "MiddleClass", label: "Middle Class" },
//     { value: "UpperClass", label: "Upper Class" },
//     { value: "LowerClass", label: "Lower Class" },
//     { value: "NoPreference", label: "No Preference" },
//   ];
//   const optionsEthnicity = [
//     { value: "Brahmin", label: "Brahmin" },
//     { value: "Chhetri", label: "Chhetri" },
//     { value: "Newar", label: "Newar" },
//     { value: "Gurung", label: "Gurung" },
//     { value: "Magar", label: "Magar" },
//     { value: "Rai", label: "Rai" },
//     { value: "Limbu", label: "Limbu" },
//     { value: "Tamang", label: "Tamang" },
//     { value: "Sherpa", label: "Sherpa" },
//     { value: "Thakuri", label: "Thakuri" },
//     { value: "Dalit", label: "Dalit" },
//     { value: "Madhesi", label: "Madhesi" },
//     { value: "Janajati", label: "Janajati" },
//     { value: "Others", label: "Others" },
//     { value: "NoPreference", label: "No Preference" },
//   ];
//   const optionsFamilyValues = [
//     { value: "Traditional", label: "Traditional" },
//     { value: "Modern", label: "Modern" },
//     { value: "Liberal", label: "Liberal" },
//     { value: "NoPreference", label: "No Preference" },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/partner-preferences",
//         formData
//       );

//       console.log("Data sent successfully:", response.data);

//       // Navigate to the next step
//       navigate("/register/step4");
//     } catch (error) {
//       console.error(
//         "Error occurred:",
//         error.response?.data?.message || error.message
//       );
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center w-full h-screen bg-center bg-cover font-outfit"
//       id="step1"
//       style={{ backgroundImage: `url(${wedding})` }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-orange-400 opacity-70"></div>
//       <form className="absolute px-28 h-[35em] shadow-lg bg-white w-[50em] rounded-3xl"
//       onSubmit={handleSubmit}>
//         <img className="absolute w-16 top-5 left-16" src={mainLogo} alt="" />
//         <p className="mt-16 mb-2 text-lg font-light text-center text-gray-600">
//           You’re now few steps closer..
//         </p>
//         <h2 className="text-[#FF6347] font-semibold text-center text-2xl mb-8">
//           Step 3 : Personal Preferences for Matches
//         </h2>
//         <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
//           <Select
//             className="w-60"
//             placeholder="Marital Status"
//             options={optionsMarital}
//             onChange={(value)=>handleSelectChange(value,"maritalStatus")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Age Range"
//             options={optionsAge}
//             onChange={(value)=>handleSelectChange(value,"ageRange")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Diet Preferences"
//             options={optionsDiet}
//             onChange={(value)=>handleSelectChange(value,"dietPreference")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Religion"
//             options={optionsReligion}
//             onChange={(value)=>handleSelectChange(value,"religion")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Ethnicity"
//             options={optionsEthnicity}
//             onChange={(value)=>handleSelectChange(value,"ethnicity")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Family Class"
//             options={optionsFamilyClass}
//             onChange={(value)=>handleSelectChange(value,"familyClass")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Education Level"
//             options={optionsEducational}
//             onChange={(value)=>handleSelectChange(value,"educationLevel")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Employment Status"
//             options={optionsEmployment}
//             onChange={(value)=>handleSelectChange(value,"employmentStatus")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Residential Status"
//             options={optionsResidential}
//             onChange={(value)=>handleSelectChange(value,"residentialStatus")}
//           />
//           <Select
//             className="w-60"
//             placeholder="Family Values"
//             options={optionsFamilyValues}
//             onChange={(value)=>handleSelectChange(value,"familyValues")}
//           />

//         </div>
//         <div className="flex justify-around mt-8 gap-x-4">
//           <button
//             className="w-72 mx-auto text-[#F24822] rounded-lg h-10 font-semibold border-2 border-[#F24822] hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             onClick={() => {
//               navigate("/register/step2");
//             }}
//           >
//             Back
//           </button>
//           <button
//             className="w-72 mx-auto bg-[#F24822] rounded-lg h-10 text-white font-semibold  hover:bg-white hover:text-rose-950 hover:border-2 hover:border-rose-950"
//             type="submit"
//           >
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step3;
