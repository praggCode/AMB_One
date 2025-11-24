import { createContext, useContext } from "react";

export const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserContext");
  }
  return context;
};


