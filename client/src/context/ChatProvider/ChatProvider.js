import { createContext, useContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatState, chatDispatch] = useReducer(chatReducer, []);

  return (
    <ChatContext.Provider value={{ chatState, chatDispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
