import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const EmptyPhotoComp = ({ onImageUpload }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        console.log("Base64 String:", base64String);
        onImageUpload(base64String);
      };
    }
  };

  return (
    <div
      onClick={handleFileClick}
      className="flex items-center justify-center w-52 bg-gray-300 border-[1px] border-gray-700 rounded-lg h-60"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <FaPlus className="text-6xl font-extrabold text-white" />
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default EmptyPhotoComp;
