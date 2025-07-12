import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ match, onCloseChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io("http://localhost:3000", {
      auth: {
        token: localStorage.getItem("token"), // Assuming you store the JWT token in localStorage
      },
    });

    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => newSocket.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && match) {
      // Emit the message to the server
      socket.emit("sendMessage", {
        receiverId: match.user1.id, // Assuming user1 is the receiver
        messageContent: message,
      });

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <h2>Chat with {match.user1.fullname}</h2>
        <button onClick={onCloseChat} style={styles.closeButton}>
          Close
        </button>
      </div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf:
                msg.senderId === match.user1.id ? "flex-end" : "flex-start",
              backgroundColor:
                msg.senderId === match.user1.id ? "#DCF8C6" : "#ECECEC",
            }}
          >
            <strong>
              {msg.senderId === match.user1.id ? "You" : match.user1.fullname}:{" "}
            </strong>
            {msg.messageContent}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.messageInput}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "400px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  closeButton: {
    padding: "5px 10px",
    backgroundColor: "#ff4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
  },
  message: {
    padding: "8px",
    margin: "5px 0",
    borderRadius: "8px",
    maxWidth: "80%",
  },
  inputContainer: {
    display: "flex",
  },
  messageInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  sendButton: {
    padding: "8px 12px",
    marginLeft: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Chat;
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const Chat = ({ match, onCloseChat }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [receiverId, setReceiverId] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the WebSocket server
//     const newSocket = io("http://localhost:3000", {
//       auth: {
//         token: localStorage.getItem("token"), // Assuming you store the JWT token in localStorage
//       },
//     });

//     setSocket(newSocket);

//     // Listen for incoming messages
//     newSocket.on("newMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Cleanup on unmount
//     return () => newSocket.disconnect();
//   }, [userId]);

//   const handleSendMessage = () => {
//     if (message.trim() && receiverId) {
//       // Emit the message to the server
//       socket.emit("sendMessage", {
//         receiverId,
//         messageContent: message,
//       });

//       // Clear the input field
//       setMessage("");
//     }
//   };

//   return (
//     <div style={styles.chatContainer}>
//       <div style={styles.chatHeader}>
//         <h2>Chat with User {receiverId}</h2>
//         <input
//           type="number"
//           placeholder="Enter Receiver ID"
//           value={receiverId || ""}
//           onChange={(e) => setReceiverId(Number(e.target.value))}
//           style={styles.receiverInput}
//         />
//       </div>
//       <div style={styles.messagesContainer}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               ...styles.message,
//               alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
//               backgroundColor: msg.senderId === userId ? "#DCF8C6" : "#ECECEC",
//             }}
//           >
//             <strong>
//               {msg.senderId === userId ? "You" : `User ${msg.senderId}`}:{" "}
//             </strong>
//             {msg.messageContent}
//           </div>
//         ))}
//       </div>
//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           style={styles.messageInput}
//         />
//         <button onClick={handleSendMessage} style={styles.sendButton}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   chatContainer: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//   },
//   chatHeader: {
//     marginBottom: "20px",
//   },
//   receiverInput: {
//     padding: "8px",
//     fontSize: "16px",
//     marginLeft: "10px",
//   },
//   messagesContainer: {
//     flex: 1,
//     overflowY: "auto",
//     padding: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//   },
//   message: {
//     padding: "10px",
//     margin: "5px 0",
//     borderRadius: "8px",
//     maxWidth: "60%",
//     wordWrap: "break-word",
//   },
//   inputContainer: {
//     display: "flex",
//     marginTop: "10px",
//   },
//   messageInput: {
//     flex: 1,
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//   },
//   sendButton: {
//     padding: "10px 20px",
//     marginLeft: "10px",
//     fontSize: "16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
// };

// export default Chat;
