import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

  const getUsername = localStorage.getItem("USERNAME")
    ? JSON.parse(localStorage.getItem("USERNAME"))
    : null;

  const [token, setToken] = useState(getToken);
  const [username, setUsername] = useState(getUsername);

  const sendData = {
    token,
    setToken,
    username,
    setUsername,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  return context;
};
