import { createContext, useContext, useReducer } from "react";
import { userReducer } from "../reducer";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {});

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
