// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// // import { useAuth } from './AuthContext';
// import { useAuth } from "./authContext";

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [matches, setMatches] = useState([]);
//   const { user, token } = useAuth();
//   const [selectcetdMatch, setSelectedMatch] = useState(null);

//   const sendMessage = (receiverId, content) => {
//     // Only send receiverId and messageContent
//     socket?.emit("sendMessage", { receiverId, messageContent: content });
//   };

//   const contextValue = {
//     socket,
//     messages,
//     onlineUsers,
//     matches,
//     selectcetdMatch,
//     setSelectedMatch,
//     currentUserId: user?.id,
//     sendMessage,
//     // (receiverId, content) => {
//     //   socket?.emit("sendMessage", { receiverId, content, senderId: user?.id });
//     // },
//   };

//   useEffect(() => {
//     if (!user || !token) return;

//     const newSocket = io(process.env.REACT_APP_API_URL, {
//       auth: { token },
//       transports: ["websocket"],
//     });

//     setSocket(newSocket);

//     // Fetch matches
//     const fetchMatches = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/chat/matches`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await response.json();
//         setMatches(data);
//       } catch (error) {
//         console.error("Error fetching matches:", error);
//       }
//     };
//     fetchMatches();

//     // Socket listeners
//     newSocket.on("newMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     newSocket.on("onlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     return () => newSocket.disconnect();
//   }, [user, token]);



//   return (
//     <ChatContext.Provider
//       value={{ contextValue }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a chatProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const { user, token } = useAuth();

  // Initialize socket connection
  useEffect(() => {
    if (!user?.id || !token) return;

    const newSocket = io(process.env.REACT_APP_API_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      setIsConnected(true);
      setError(null);
      newSocket.emit('onlineUsers');
    });
    newSocket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    newSocket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
      console.error("Socket connection error:", err);
    });

    // Message handlers
    newSocket.on("newMessage", (message) => {
      setMessages(prev => {
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    newSocket.on("error", (error) => {
      setError(error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id, token]);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/chat/matches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        setError("Error fetching matches: " + error.message);
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [token]);

  // Fetch messages for selected match
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !selectedMatch) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/chat/messages/${selectedMatch.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError("Error fetching messages: " + error.message);
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedMatch, token]);

  const sendMessage = async (receiverId, messageContent) => {
    if (!socket || !isConnected) {
      setError("Cannot send message: Socket not connected");
      return;
    }

    try {
      socket.emit("sendMessage", {
        receiverId,
        messageContent,
        senderId: user.id,
      });
    } catch (error) {
      setError("Error sending message: " + error.message);
      console.error("Error sending message:", error);
    }
  };

  const value = {
    socket,
    messages,
    onlineUsers,
    matches,
    selectedMatch,
    setSelectedMatch,
    currentUserId: user?.id,
    sendMessage,
    isConnected,
    error,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;