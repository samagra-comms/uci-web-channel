// CustomChat.js (or CustomChat.tsx)
import React, { useState } from "react";
import styles from "./index.module.css"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { MessageItem } from "../message-item"; // Import the MessageItem component here

const CustomChat = ({ messages, onSend, disableSend, placeholder, currentUser }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend("text", inputValue);
      setInputValue("");
    }
  };

  const handleOptionClick = (optionText: any) => {
    onSend("text", optionText);
  };

  return (
    <div className={styles["custom-chat-container"]}>
      <div className={styles["custom-chat-messages"]}>
        {messages.map((message: any, index: any) => (
          <MessageItem // Render each message using the MessageItem component
            key={index}
            msg={message}
            chatUIMsg={messages}
            currentUser={currentUser} // Pass the currentUser prop here as well
            onSend={onSend} // You might need to pass onSend here
            onOptionClick={handleOptionClick} // Pass the option click handler here
          />
        ))}
      </div>
      <div className={styles["custom-chat-input"]}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disableSend} // Disable the input when options are shown
        />
        <button className={styles["send-btn"]} onClick={handleSend} disabled={disableSend}>
          <FontAwesomeIcon icon={faPaperPlane} /> {/* Use the send icon here */}
        </button>
      </div>
    </div>
  );
};

export default CustomChat;