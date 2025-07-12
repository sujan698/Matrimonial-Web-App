import React, { useState } from "react";
import { MdBlock, MdReport } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import axios from "axios";

const ReportPopup = ({ currentUserId, onReportSubmit }) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isReportFormVisible, setIsReportFormVisible] = useState(false);
  const [reportContent, setReportContent] = useState("");

  // Fetch the reporter's userId from localStorage
  const reporterUserId = JSON.parse(localStorage.getItem("user"))?.id;

  const toggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleReportClick = () => {
    setIsReportFormVisible(true);
    setIsBoxVisible(false); // Hide the options box
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
  
    try {
      const reporterUserId = JSON.parse(localStorage.getItem("user"))?.id;
  
      if (!reporterUserId) {
        throw new Error("Reporter user ID is missing");
      }
  
      // Prepare the payload
      const payload = {
        userId: reporterUserId, // Use "userId" as the key
        reportedUserId: currentUserId, // Use "reportedUserId" as the key
        reportContent, // Use "reportContent" as the key
      };
  
      console.log("Payload being sent:", payload); // Debugging
  
      const response = await axios.post("http://localhost:3000/reports", payload);
  
      if (response.status === 200 || response.status === 201) {
        alert("Report submitted successfully!");
        setIsReportFormVisible(false); // Hide the form after submission
        setReportContent(""); // Clear the form
  
        // Call the onReportSubmit callback to handle swiping to the next user
        onReportSubmit();
      } else {
        throw new Error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  return (
    <div className="relative">
      <SlOptionsVertical
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          toggleBox();
        }}
        className="absolute cursor-pointer right-10 top-5 text-4xl text-[#F24822]"
      />

      {/* Pop-up box */}
      {isBoxVisible && (
        <div className="absolute text-gray-600 left-[33em] w-40 mt-2 bg-white rounded shadow-lg">
          <div
            onClick={handleReportClick}
            className="flex justify-center items-center gap-x-3 p-3 hover:bg-gray-100 w-full cursor-pointer"
          >
            <MdReport />
            <span>Report Profile</span>
          </div>
          {/* <div className="flex justify-center items-center gap-x-3 p-3 hover:bg-gray-100 w-full">
            <MdBlock className="-ml-2" />
            <span>Block Profile</span>
          </div> */}
        </div>
      )}

      {/* Report Form */}
      {isReportFormVisible && (
        <div className="absolute left-[33em] mt-2 bg-white rounded shadow-lg p-4 w-64">
          <form onSubmit={handleSubmitReport}>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for reporting:
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your reason..."
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              required
            ></textarea>
            <div className="mt-4 flex justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setIsReportFormVisible(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReportPopup;
