import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import {   optionsReligion, optionsEthnicity, optionsFamilyValues, optionsFamilyClass } from "../../RegisterSteps/options/option";

const Matchmaking = ({ profileData }) => {
  const [matchmakingData, setMatchmakingData] = useState({
    ethnicity: profileData?.FamilyDetails?.[0]?.ethnicity || "",
    familyClass: profileData?.FamilyDetails?.[0]?.familyClass || "",
    familyValues: profileData?.FamilyDetails?.[0]?.familyValues || "",
    religion: profileData?.FamilyDetails?.[0]?.religion || "",

  });

  const [editField, setEditField] = useState(null);

  const handleChange = (field, value) => {
    setMatchmakingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/familydetails/${profileData?.FamilyDetails?.[0]?.id}`,
        {
          matchmakingData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditField(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <div>
        <table className="w-[34em]">
          <tbody>
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Ethnicity</h4>
                    {editField === "ethnicity" ? (
                      <Select
                        value={optionsEthnicity.find(
                          (opt) => opt.value === matchmakingData.ethnicity
                        )}
                        options={optionsEthnicity}
                        onChange={(e) => handleChange("ethnicity", e.value)}
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {matchmakingData.ethnicity}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("ethnicity")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>

            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Family Values</h4>
                    {editField === "familyValues" ? (
                      <Select
                        value={optionsFamilyValues.find(
                          (opt) => opt.value === matchmakingData.familyValues
                        )}
                        options={optionsFamilyValues}
                        onChange={(e) => handleChange("familyValues", e.value)}
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {matchmakingData.familyValues}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("familyValues")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>

            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Family Class</h4>
                    {editField === "familyClass" ? (
                      <Select
                        value={optionsFamilyClass.find(
                          (opt) => opt.value === matchmakingData.familyClass
                        )}
                        options={optionsFamilyClass}
                        onChange={(e) => handleChange("familyClass", e.value)}
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {matchmakingData.familyClass}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("familyClass")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>

            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Religion</h4>
                    {editField === "religion" ? (
                      <Select
                        value={optionsReligion.find(
                          (opt) => opt.value === matchmakingData.religion
                        )}
                        options={optionsReligion}
                        onChange={(e) => handleChange("religion", e.value)}
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {matchmakingData.religion}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("religion")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 mt-4 text-white bg-[#F24822] rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;

// import React from "react";
// import { FaEdit } from "react-icons/fa";

// const Matchmaking = ({profileData}) => {
//   return (
//     <div>
//       <div>
//         <table className="w-[34em]">
//           <tbody>
//             <tr className="border-2 border-b">
//               <td className="border-[2px] border-slate-500">
//                 <div className="flex items-center justify-between px-8 py-2">
//                   <div>
//                     <h4 className="font-medium">Diet Peference</h4>
//                     <p className="text-[15px] text-slate-500 -mt-1">{profileData?.DemographicDetails?.[0]?.dietPreference}</p>
//                   </div>
//                   <FaEdit color="#F24822" size={20} />
//                 </div>
//               </td>
//             </tr>

//             <tr className="border-2 border-b">
//               <td className="border-[2px] border-slate-500">
//                 <div className="flex items-center justify-between px-8 py-2">
//                   <div>
//                     <h4 className="font-medium">Height</h4>
//                     <p className="text-[15px] text-slate-500 -mt-1">
//                       {profileData?.DemographicDetails?.[0]?.height}
//                     </p>
//                   </div>
//                   <FaEdit color="#F24822" size={20} />
//                 </div>
//               </td>
//             </tr>
//             <tr className="border-2 border-b">
//               <td className="border-[2px] border-slate-500">
//                 <div className="flex items-center justify-between px-8 py-2">
//                   <div>
//                     <h4 className="font-medium">Family Type</h4>
//                     <p className="text-[15px] text-slate-500 -mt-1">
//                       {profileData?.FamilyDetails?.[0]?.familyValues}
//                     </p>
//                   </div>
//                   <FaEdit color="#F24822" size={20} />
//                 </div>
//               </td>
//             </tr>
//             <tr className="border-2 border-b">
//               <td className="border-[2px] border-slate-500">
//                 <div className="flex items-center justify-between px-8 py-2">
//                   <div>
//                     <h4 className="font-medium">Income Range</h4>
//                     <p className="text-[15px] text-slate-500 -mt-1">
//                       {profileData?.DemographicDetails?.[0]?.incomeRange}
//                     </p>
//                   </div>
//                   <FaEdit color="#F24822" size={20} />
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Matchmaking;
