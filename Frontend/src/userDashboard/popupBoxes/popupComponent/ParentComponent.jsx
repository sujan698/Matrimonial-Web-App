// import React from "react";
// import PopupLikes from "./PopupLikes";
// import ReportPopup from "../ReportPopup";

// const ParentComponent = () => {
//   const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

//   console.log("Retrieved userId from localStorage:", userId); // Debugging

//   if (!userId) {
//     return <p>Please log in to view notifications.</p>;
//   }

//   return (
//     <div>
//       <PopupLikes userId={userId} /> {/* Pass userId as a prop */}
//       <ReportPopup currentUserId={currentUserId} onReportSubmit={handleSwipeToNextUser} />
//     </div>
//   );
// };

// export default ParentComponent;