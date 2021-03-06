import { createContext, useContext, useReducer } from "react";
import { roomReducer } from "../reducer";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomState, roomDispatch] = useReducer(roomReducer, {});

  return (
    <RoomContext.Provider value={{ roomState, roomDispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(RoomContext);
};
