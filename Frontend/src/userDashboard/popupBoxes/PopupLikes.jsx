import React, { useEffect, useState } from 'react';
import LikesComp from './popupComponent/LikesComp';
import axios from 'axios';

const PopupLikes = ({ likes }) => {
  console.log(likes)


  return (
    <div className="absolute -right-4 mt-2 p-3 h-[520px] w-[25em] bg-white border border-gray-300 rounded overflow-y-auto">
      <h1 className="text-[#F24822] font-bold text-xl ml-1">Likes</h1>
      <ul className="flex flex-col font-semibold text-lg pl-2 mt-5 w-full gap-y-4">
        {likes.map((like, index) => (
          <li key={index}>
            <LikesComp like={like} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopupLikes;
