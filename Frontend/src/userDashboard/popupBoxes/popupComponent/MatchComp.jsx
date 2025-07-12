import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

const MatchComp = ({ match, onOpenChat }) => {
  return (
    <div className="flex w-full gap-x-4 hover:bg-gray-100">
      <div className="border-2 border-[#F24822] rounded-full w-16 h-16 mx-auto mt-4 overflow-hidden">
        <img
          className="object-cover w-full h-full rounded-full"
          src={match?.user1?.UploadPhoto?.[0]?.image_url}
          alt="profilepic"
        />
      </div>
      <div className="flex items-center">
        <h3 className="w-56">{match?.user1?.fullname}</h3>
        {/* Add onClick handler to open the chat */}
        <BiMessageRoundedDetail
          className="text-[#F24822] text-3xl cursor-pointer"
          onClick={() => onOpenChat(match)}
        />
      </div>
    </div>
  );
};

export default MatchComp;
// import React from 'react'
// import profilePic from "../../../assets/Chat photo.png";
// import { BiMessageRoundedDetail } from 'react-icons/bi';

// const MatchComp = ({ match }) => {
//   return (
//     <div className="flex w-full gap-x-4 hover:bg-gray-100">
//       <div className='border-2 border-[#F24822] rounded-full w-16 h-16 mx-auto mt-4 overflow-hidden'>
//         <img className="object-cover w-full h-full rounded-full" src={match?.user1?.UploadPhoto?.[0]?.image_url} alt="profilepic" />
//         </div >
//         <div className="flex items-center ">
//           <h3 className="w-56">{match?.user1?.fullname}</h3>
//           {/* message  */}
//           <BiMessageRoundedDetail className="text-[#F24822] text-3xl" />
//         </div>
//       </div>
//       );
// }

//       export default MatchComp
