import React from 'react';
import { useChat } from '../context/chatContext';

const ChatList = () => {
    const { matches, onlineUsers, currentUserId } = useChat();

    return (
        <div className="chat-list">
            {matches.map((match) => {
                const otherUser =
                    match.user1.id === currentUserId ? match.user2 : match.user1;
                return (
                    <div key={match.id} className="chat-item">
                        <img src={otherUser.profilePicture} alt={otherUser.name} />
                        <div>
                            <h3>{otherUser.fullname}</h3>
                            {onlineUsers.includes(otherUser.id) && <span className="online-dot" />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList;