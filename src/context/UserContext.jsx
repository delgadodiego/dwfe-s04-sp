import { createContext, useEffect, useState } from "react";
import { addUserToFirestore, handleAuthChange } from "../services/auth";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("welcome");

  useEffect(() => {
    const unsubscribe = handleAuthChange(async (user) => {
      if (user) {
        setUser(user);
        const contextUser = await addUserToFirestore(user);
        setUser(contextUser);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
