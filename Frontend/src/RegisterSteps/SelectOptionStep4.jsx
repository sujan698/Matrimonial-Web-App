import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SelectOptionStep4 = ({label, isSelected, onClick}) => {

  // const handleClick = () => {
  //   setIsSelected(!isSelected); // Toggle the selection state
  // };
  return (
    <div
      className={`relative w-32 text-center border-[1px] py-1 px-2 hover:cursor-pointer ${
        isSelected ? "border-[#F24822]" : "border-gray-500"
      }
      }  text-sm text-gray-900 rounded-full  `}
      onClick={onClick}
    >
      {isSelected && (
        <span className="absolute left-5 font-bold text-lg text-[#F24822]  ">
          <IoIosCheckmarkCircleOutline />
        </span> // Checkmark
      )}
      <span className={`${isSelected? "text-[#F24822]": "text-gray-900"}`}>{label}</span>
    </div>
  );
};

export default SelectOptionStep4;
