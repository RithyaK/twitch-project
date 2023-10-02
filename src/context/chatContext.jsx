import React, { useContext, useState } from "react";

const Context = React.createContext();

export const ChatContextProvider = (props) => {
  // données -----------------------------------------------
  const [tchat, setTchat] = useState(false);
  const [usernameTchatteur, setUsernameTchatteur] = useState("");
  const [MessageFromUser, setMessageFromUser] = useState([]);
  const [MessageToUser, setMessageToUser] = useState([]);
  const [conversationID, setConversationID] = useState("");

  // render -----------------------------------------------
  return (
    /* eslint-disable */
    <Context.Provider
      value={[
        tchat,
        setTchat,
        usernameTchatteur,
        setUsernameTchatteur,
        MessageFromUser,
        setMessageFromUser,
        MessageToUser,
        setMessageToUser,
        conversationID,
        setConversationID,
      ]}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useChatContext = () => useContext(Context);
/* eslint-disable */
