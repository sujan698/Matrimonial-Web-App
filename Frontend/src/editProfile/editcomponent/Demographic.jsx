import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import {
  optionsEducational,
  optionsEmployment,
  optionsHeight,
  optionsMarital,
  optionsMotherTongue,
  optionsResidential,
} from "../../RegisterSteps/options/option";

const Demographic = ({ profileData }) => {
  // State to hold form data
  const [demographicData, setDemographicData] = useState({
    maritalStatus: profileData?.DemographicDetails?.[0]?.maritalStatus || "",
    residentialStatus:profileData?.DemographicDetails?.[0]?.residentialStatus || "",
    height: profileData?.DemographicDetails?.[0]?.height || "",
    motherTongue: profileData?.DemographicDetails?.[0]?.motherTongue || "",
    employmentStatus:
      profileData?.DemographicDetails?.[0]?.employmentStatus || "",
    educationLevel: profileData?.DemographicDetails?.[0]?.educationLevel || "",
  });

  // State to track which field is being edited
  const [editField, setEditField] = useState(null);

  // Handle input change (react-select returns an object)
  const handleChange = (field, selectedOption) => {
    setDemographicData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  // Handle Save to update data in the database
  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/demographic-details/${profileData?.DemographicDetails?.[0]?.id}`,
        {
          id: profileData?.DemographicDetails?.[0]?.id, // Ensure ID is passed
          ...demographicData,
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
                            option.value === demographicData.maritalStatus
                        )}
                        options={optionsMarital}
                        onChange={(selected) =>
                          handleChange("maritalStatus", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.maritalStatus}
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
                    <h4 className="font-medium">Height</h4>
                    {editField === "height" ? (
                      <Select
                        value={optionsHeight.find(
                          (option) => option.value === demographicData.height
                        )}
                        options={optionsHeight}
                        onChange={(selected) =>
                          handleChange("height", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.height}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("height")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
            {/* mother tongue  */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Mother Tongue</h4>
                    {editField === "motherTongue" ? (
                      <Select
                        value={optionsMotherTongue.find(
                          (option) =>
                            option.value === demographicData.motherTongue
                        )}
                        options={optionsMotherTongue}
                        onChange={(selected) =>
                          handleChange("motherTongue", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.motherTongue}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("motherTongue")}
                    className="cursor-pointer"
                  />
                </div>
              </td>
            </tr>
            {/* residential status  */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Residential Status</h4>
                    {editField === "residentialStatus" ? (
                      <Select
                        value={optionsResidential.find(
                          (option) =>
                            option.value === demographicData.residentialStatus
                        )}
                        options={optionsResidential}
                        onChange={(selected) =>
                          handleChange("residentialStatus", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.residentialStatus}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("residentialStatus")}
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
                        value={optionsEmployment.find(
                          (option) =>
                            option.value === demographicData.employmentStatus
                        )}
                        options={optionsEmployment}
                        onChange={(selected) =>
                          handleChange("employmentStatus", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.employmentStatus}
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

            {/* Education Level */}
            <tr className="border-2 border-b">
              <td className="border-[2px] border-slate-500">
                <div className="flex items-center justify-between px-8 py-2">
                  <div>
                    <h4 className="font-medium">Education Level</h4>
                    {editField === "educationLevel" ? (
                      <Select
                        value={optionsEducational.find(
                          (option) =>
                            option.value === demographicData.educationLevel
                        )}
                        options={optionsEducational}
                        onChange={(selected) =>
                          handleChange("educationLevel", selected)
                        }
                        className="text-[15px] text-slate-500 -mt-1 border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <p className="text-[15px] text-slate-500 -mt-1">
                        {demographicData.educationLevel}
                      </p>
                    )}
                  </div>
                  <FaEdit
                    color="#F24822"
                    size={20}
                    onClick={() => setEditField("educationLevel")}
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
  );
};

export default Demographic;
