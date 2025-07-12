import React, { useState } from "react";
import { useChat } from "../../context/chatContext";
import ChatWindow from "../../components/chatWindow";

const PopupChatbox = () => {
  const { currentUserId, matches=[], onlineUsers, messages, selectedMatch, setSelectedMatch } = useChat();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMatches = matches.filter(match => {
    const otherUser = match.user1.id === currentUserId ? match.user2 : match.user1;
    return otherUser.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="absolute -left-32 mt-2 p-4 h-[520px] w-80 bg-white border border-gray-300 rounded overflow-y-auto">
      <h1 className="text-[#F24822] font-bold text-xl ml-1">Chats</h1>
      <input
        type="search"
        placeholder="Search chats"
        className="px-4 h-9 mt-2 w-full rounded-full border-2 border-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!selectedMatch ? (
        <ul className="flex flex-col font-semibold text-lg pl-4 mt-5 w-full gap-y-4">
          {filteredMatches.map(match => {
            const otherUser = match.user1.id === currentUserId ? match.user2 : match.user1;
            const lastMessage = messages.find(m =>
              (m.senderId === otherUser.id || m.receiverId === otherUser.id)
            );

            return (
              <li
                key={match.id}
                onClick={() => setSelectedMatch(otherUser)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <div className='flex gap-x-4 items-center'>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={otherUser.profilePic || "../../assets/Chat photo.png"}
                    alt="profile"
                  />
                  <div className="flex-1">
                    <h3>{otherUser.fullname}</h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {lastMessage?.messageContent || 'Start chatting!'}
                      <span className="ml-2 text-xs">
                        {lastMessage?.sentAt && new Date(lastMessage.sentAt).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                  {onlineUsers.includes(otherUser.id) && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ChatWindow
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};

export default PopupChatbox;