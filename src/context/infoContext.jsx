import React, { useContext, useState } from "react";
/* eslint-disable */
const Context = React.createContext();

export const InfoContextProvider = (props) => {
  // données -----------------------------------------------
  const [username, setUsername] = useState("Krzept");
  const [streamerCategory, setStreamerCategory] = useState("streamerCategory");
  const contextValue = {
    username,
    setUsername,
    streamerCategory,
    setStreamerCategory,
  };
  // render -----------------------------------------------
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export const useInfoContext = () => useContext(Context);
