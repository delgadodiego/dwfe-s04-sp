import { createContext, useState, useEffect } from "react";
import { handleAuthChange } from "../services/auth";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = handleAuthChange((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
  // debería pasarse el resto del perfil del usuario (Google+Firebase)
};
