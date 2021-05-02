import { createContext, useContext, useReducer } from "react";
import { roomReducer } from "../reducer";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomState, roomDispatch] = useReducer(roomReducer, {
    roomId: "608e88588826f40f04b985bd",
    chat: [],
    topic: "Functional programming",
  });

  return (
    <RoomContext.Provider value={{ roomState, roomDispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(RoomContext);
};
