import React from 'react'
import profilePic from "../../../assets/Chat photo.png";

const ChatComp = () => {
  return (
    <div className='flex gap-x-4'>
          <img className="w-12" src={profilePic} alt="profilepic" />
          <div>
            <h3>Sampanna</h3>
            {/* message  */}
            <p className="text-sm text-gray-500 font-medium">
              K cha khabar? <span className="ml-10">1hr</span>
            </p>
          </div>
    </div>
  )
}

export default ChatComp