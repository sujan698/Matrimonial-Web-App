import React, { useState } from "react";
import MatchComp from "./popupComponent/MatchComp";
import Chat from "../../components/Chat"; 

const PopupMatchbox = ({ matches }) => {
  const [selectedMatch, setSelectedMatch] = useState(null); // Track the selected match
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if the chat is open

  const handleOpenChat = (match) => {
    setSelectedMatch(match); // Set the selected match
    setIsChatOpen(true); // Open the chat
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); // Close the chat
    setSelectedMatch(null); // Clear the selected match
  };

  return (
    <div className="absolute -left-44 mt-2 p-4 h-[520px] w-[25em] bg-white border border-gray-300 rounded overflow-y-auto">
      <h1 className="text-[#F24822] font-bold text-xl ml-1">Matches</h1>
      <input
        type="search"
        placeholder="Search matches"
        className="w-full px-4 mt-2 border-2 border-gray-500 rounded-full h-9"
      />
      <ul className="flex flex-col w-full pl-4 mt-5 text-lg font-semibold gap-y-4">
        {matches.map((match, index) => (
          <li key={index}>
            <MatchComp match={match} onOpenChat={handleOpenChat} />
          </li>
        ))}
      </ul>

      {/* Conditionally render the Chat component */}
      {isChatOpen && selectedMatch && (
        <Chat match={selectedMatch} onCloseChat={handleCloseChat} />
      )}
    </div>
  );
};

export default PopupMatchbox;
// import React, { useEffect, useState } from 'react'
// import MatchComp from './popupComponent/MatchComp';

// const PopupMatchbox = ({ matches }) => {
//   console.log("Small one", matches)
//   return (
//     <div className="absolute -left-44 mt-2 p-4 h-[520px] w-[25em] bg-white border border-gray-300 rounded overflow-y-auto">
//       <h1 className="text-[#F24822] font-bold text-xl ml-1">Matches</h1>
//       <input
//         type="search"
//         placeholder="Search matches"
//         className="w-full px-4 mt-2 border-2 border-gray-500 rounded-full h-9"
//       />
//       <ul className="flex flex-col w-full pl-4 mt-5 text-lg font-semibold gap-y-4">
//       {matches.map((match, index) => (
//           <li key={index}>
//             <MatchComp match={match} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PopupMatchbox
