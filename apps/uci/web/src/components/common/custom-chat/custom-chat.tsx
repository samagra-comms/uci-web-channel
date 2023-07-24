import React, { useState } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CustomChat = ({ messages, onSend, disableSend, placeholder }) => {
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

  return (
    <div className={styles["custom-chat-container"]}>
      <div className={styles["custom-chat-messages"]}>
        {messages.map((message: { position: string; content: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }, index: React.Key | null | undefined) => (
          <div
            key={index}
            className={`${styles["custom-chat-bubble"]} ${
              message.position === "right" ? styles["right"] : styles["left"]
            }`}
          >
            {message.content.text}
          </div>
        ))}
      </div>
      <div className={styles["custom-chat-input"]}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <button className={styles["send-btn"]} onClick={handleSend} disabled={disableSend}>
          <FontAwesomeIcon icon={faPaperPlane} /> {/* Use the send icon here */}
        </button>
      </div>
    </div>
  );
};

export default CustomChat;
