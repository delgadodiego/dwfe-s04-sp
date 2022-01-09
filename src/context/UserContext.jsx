import { createContext, useState, useEffect } from "react";
import { handleAuthChange } from "../services/auth";
import { Navigate } from "react-router-dom";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("login");

  useEffect(() => {
    const unsubscribe = handleAuthChange((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, [section, setSection]);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
  // debería pasarse el resto del perfil del usuario (Google+Firebase)
};
