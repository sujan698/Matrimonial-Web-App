import React, { useEffect, useRef, useState } from 'react';
import { useChat } from "../context/chatContext";
import { useAuth } from "../context/authContext"

const ChatWindow = ({ match, onClose }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { messages, sendMessage, currentUserId, setMessages } = useChat(); // Add setMessages from useChat
    const { token } = useAuth(); // Get token from useAuth
    const messagesEndRef = useRef(null);

    // Filter messages between the current user and the selected match
    const filteredMessages = messages.filter(
        (msg) =>
            (msg.senderId === currentUserId && msg.receiverId === match.id) ||
            (msg.senderId === match.id && msg.receiverId === currentUserId)
    );

    // Fetch message history when the component mounts or when match.id changes
    useEffect(() => {
        const fetchMessageHistory = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/chat/messages/${match.id}`, // Correct endpoint
                    {
                        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
                    }
                );
                const data = await response.json();
                setMessages((prev) => {
                    // Filter out duplicates
                    const newMessages = data.filter(
                        (newMsg) => !prev.some((prevMsg) => prevMsg.id === newMsg.id)
                    );
                    return [...newMessages, ...prev]; // Append new messages to the existing ones
                });
            } catch (error) {
                console.error('Failed to fetch message history:', error);
            }
        };

        if (match?.id && token) {
            fetchMessageHistory(); // Fetch message history only if match.id and token are available
        }
    }, [match?.id, token, setMessages]); // Add dependencies

    // Scroll to the bottom of the chat window when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [filteredMessages]);

    // Handle message submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(match.id, inputMessage); // Send the message
            setInputMessage(''); // Clear the input field
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={onClose}
                    className="text-[#F24822] font-bold"
                >
                    ← Back
                </button>
                <h3 className="text-[#F24822] font-bold">{match.fullname}</h3>
            </div>

            <div className="flex-1 overflow-y-auto mb-4">
                {filteredMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start' // Correct alignment
                            }`}
                    >
                        <div
                            className={`max-w-[70%] p-3 rounded-lg ${message.senderId === currentUserId
                                ? 'bg-[#F24822] text-white' // Current user's message
                                : 'bg-gray-100' // Other user's message
                                }`}
                        >
                            <p>{message.messageContent}</p>
                            <span className="text-xs opacity-75 block mt-1">
                                {new Date(message.sentAt).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Scroll anchor */}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border-2 border-gray-300 rounded-full px-4 py-2"
                />
                <button
                    type="submit"
                    className="bg-[#F24822] text-white rounded-full px-4 py-2 hover:bg-orange-600 transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;