import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ChatWindow from "./ChatWindow";
import RecentChat from "./RecentChat";
import SettingsBar from "./SettingsBar";

interface webViewProps {
  currentMessageObj: {
    user: string;
    phoneNumber: string | null;
    messages: any[];
  };
  toClearChat: () => void;
  messages: any[];
  username: string;
  selected: (option: { key: string; text: string; backmenu: boolean }) => void;
  sendMessageFunc: (text: string, media: any) => void;
  allUsers: { name: string; number: string | null; active: boolean }[];
  toChangeCurrentUser: (name: string, number: string | null) => void;
  currentUser: { name: string; number: string | null };
  addingNewUser: (newName: string, newNumber: string | null) => void;
  toRemoveUser: (name: string, number: string | null) => void;
  onSendLocation: (location: string) => void;
}

const WebView: React.FC<webViewProps> = ({
  currentMessageObj,
  toClearChat,
  addingNewUser,
  currentUser,
  messages,
  username,
  selected,
  sendMessageFunc,
  allUsers,
  toChangeCurrentUser,
  toRemoveUser,
  onSendLocation,
}) => {
  return (
    <React.Fragment>
      <SettingsBar  />
      {/* <RecentChat
        onAddingNewUser={addingNewUser}
        toChangeCurrentUser={toChangeCurrentUser}
        allUsers={allUsers}
        toRemoveUser={toRemoveUser}
      /> */}
      <ChatWindow
       currentMessageObj={currentMessageObj}
       toClearChat={toClearChat}
        currentUser={currentUser}
        messages={messages}
        username={username}
        selected={selected}
        toSendMessage={sendMessageFunc} 
        onSendLocation={onSendLocation}        
      />
    </React.Fragment>
  );
};

export default WebView;
