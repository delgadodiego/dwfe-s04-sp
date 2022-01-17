import { createContext, useEffect, useState } from "react";
import { addUserToFirestore, handleAuthChange } from "../services/auth";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(undefined);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [section, setSection] = useState("unlogged");
  const [availableToPost, setAvailableToPost] = useState(false);

  useEffect(() => {
    const unsubscribe = handleAuthChange(async (user) => {
      if (user) {
        const contextUser = await addUserToFirestore(user);
        setUser(contextUser);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        selectedColor,
        setSelectedColor,
        section,
        setSection,
        availableToPost,
        setAvailableToPost,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
