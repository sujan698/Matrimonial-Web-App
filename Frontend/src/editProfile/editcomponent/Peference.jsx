import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { optionsAgeP, optionsDietP, optionsEmploymentP, optionsEthnicity, optionsEthnicityP, optionsMarital, optionsReligionP } from '../../RegisterSteps/options/option';
import Select from 'react-select'
import axios from 'axios'

const Peference = ({ profileData }) => {
  const [preferenceData, setPreferenceData] = useState({
    maritalStatus: profileData?.PartnerPreference?.[0]?.maritalStatus || "",
    ageRange: profileData?.PartnerPreference?.[0]?.ageRange || "",
    religion: profileData?.PartnerPreference?.[0]?.religion || "",
    ethnicity: profileData?.PartnerPreference?.[0]?.ethnicity || "",
    dietPreference: profileData?.PartnerPreference?.[0]?.dietPreference || "",

    employmentStatus:
      profileData?.PartnerPreference?.[0]?.employmentStatus || "",

  });

  // State to track which field is being edited
  const [editField, setEditField] = useState(null);

  // Handle input change (react-select returns an object)
  const handleChange = (field, selectedOption) => {
    setPreferenceData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  // Handle Save to update data in the database
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/partner-preferences/${profileData?.PartnerPreference?.[0]?.id}`,
        {
          id: profileData?.PartnerPreference?.[0]?.id, // Ensure ID is passed
          ...preferenceData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT token
            "Content-Type": "application/json",
          },
        }
      );

      // Exit edit mode after saving
      setEditField(null);
      alert("Partner Preference updated successfully!");
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
            {/* Marital Status */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Marital Status</h4>
                    {editField === "maritalStatus" ? (
                      <Select
                        value={optionsMarital.find(
                          (option) =>
                            option.value === preferenceData.maritalStatus
                        )}
                        options={optionsMarital}
                        onChange={(selected) =>
                          handleChange("maritalStatus", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.maritalStatus}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("maritalStatus")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
            {/* height  */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Age Range</h4>
                    {editField === "ageRange" ? (
                      <Select
                        value={optionsAgeP.find(
                          (option) => option.value === preferenceData.ageRange
                        )}
                        options={optionsAgeP}
                        onChange={(selected) =>
                          handleChange("ageRange", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.ageRange}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("ageRange")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
            {/* religion */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Religion</h4>
                    {editField === "religion" ? (
                      <Select
                        value={optionsReligionP.find(
                          (option) =>
                            option.value === preferenceData.religion
                        )}
                        options={optionsReligionP}
                        onChange={(selected) =>
                          handleChange("religion", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.religion}
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
            {/* ethnicity  */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Ethnicity</h4>
                    {editField === "ethnicity" ? (
                      <Select
                        value={optionsEthnicityP.find(
                          (option) =>
                            option.value === preferenceData.ethnicity
                        )}
                        options={optionsEthnicityP}
                        onChange={(selected) =>
                          handleChange("ethnicity", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.ethnicity}
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

            {/* Employment Status */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Employment Status</h4>
                    {editField === "employmentStatus" ? (
                      <Select
                        value={optionsEmploymentP.find(
                          (option) =>
                            option.value === preferenceData.employmentStatus
                        )}
                        options={optionsEmploymentP}
                        onChange={(selected) =>
                          handleChange("employmentStatus", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.employmentStatus}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("employmentStatus")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>

            {/* diet preference */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Diet Preference</h4>
                    {editField === "dietPreference" ? (
                      <Select
                        value={optionsDietP.find(
                          (option) =>
                            option.value === preferenceData.dietPreference
                        )}
                        options={optionsDietP}
                        onChange={(selected) =>
                          handleChange("dietPreference", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {preferenceData.dietPreference}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("dietPreference")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Save Button */}
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
    // <div>
    //   <div>
    //     <div>
    //       <table className="w-[34em]">
    //         <tbody>
    //           <tr className="border-2 border-b">
    //             <td className="border-[2px] border-slate-500">
    //               <div className="flex items-center justify-between px-8 py-2">
    //                 <div>
    //                   <h4 className="font-medium">Marital Status</h4>
    //                   <p className="text-[15px] text-slate-500 -mt-1">
    //                     {profileData?.PartnerPreference?.[0]?.maritalStatus}
    //                   </p>
    //                 </div>
    //                 <FaEdit color="#F24822" size={20} />
    //               </div>
    //             </td>
    //           </tr>
    //           <tr className="border-2 border-b">
    //             <td className="border-[2px] border-slate-500">
    //               <div className="flex items-center justify-between px-8 py-2">
    //                 <div>
    //                   <h4 className="font-medium">Age Range</h4>
    //                   <p className="text-[15px] text-slate-500 -mt-1">
    //                     {profileData?.PartnerPreference?.[0]?.ageRange}
    //                   </p>
    //                 </div>
    //                 <FaEdit color="#F24822" size={20} />
    //               </div>
    //             </td>
    //           </tr>

    //           <tr className="border-2 border-b">
    //             <td className="border-[2px] border-slate-500">
    //               <div className="flex items-center justify-between px-8 py-2">
    //                 <div>
    //                   <h4 className="font-medium">Religion</h4>
    //                   <p className="text-[15px] text-slate-500 -mt-1">
    //                     {profileData?.PartnerPreference?.[0]?.religion}
    //                   </p>
    //                 </div>
    //                 <FaEdit color="#F24822" size={20} />
    //               </div>
    //             </td>
    //           </tr>
    //           <tr className="border-2 border-b">
    //             <td className="border-[2px] border-slate-500">
    //               <div className="flex items-center justify-between px-8 py-2">
    //                 <div>
    //                   <h4 className="font-medium">Employment Status</h4>
    //                   <p className="text-[15px] text-slate-500 -mt-1">
    //                     {profileData?.PartnerPreference?.[0]?.employmentStatus}
    //                   </p>
    //                 </div>
    //                 <FaEdit color="#F24822" size={20} />
    //               </div>
    //             </td>
    //           </tr>
    //           <tr className="border-2 border-b">
    //             <td className="border-[2px] border-slate-500">
    //               <div className="flex items-center justify-between px-8 py-2">
    //                 <div>
    //                   <h4 className="font-medium">Diet Peference</h4>
    //                   <p className="text-[15px] text-slate-500 -mt-1">
    //                     {profileData?.PartnerPreference?.[0]?.dietPreference}
    //                   </p>
    //                 </div>
    //                 <FaEdit color="#F24822" size={20} />
    //               </div>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Peference