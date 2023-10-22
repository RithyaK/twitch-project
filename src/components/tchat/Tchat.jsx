import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MdInsertEmoticon } from "react-icons/md";
import { useChatContext } from "../../context/chatContext";
import { useInfoContext } from "../../context/infoContext";
import { useEffect, useRef, useState } from "react";
const Tchat = ({ conversation }) => {
  // states, données-----------------------------------------------
  const [
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
  ] = useChatContext();
  const { username } = useInfoContext();
  const [inputMessage, setInputMessage] = useState("");
  const scrollToMessage = useRef(null);

  // comportement-----------------------------------------------
  useEffect(() => {
    updateMessageData();
    scrollToLastMessage();
  }, [handlePressEnter]);

  function handlePressEnter(e) {
    if (e.key === "Enter" && inputMessage !== "") {
      setMessageToUser((prevData) => [...prevData, inputMessage]);
      setInputMessage("");
      //  SET DATA
    }
  }
  function updateMessageData() {
    fetch(`http://localhost:3004/conversations/${conversationID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        messagetotheuser: MessageToUser,
      }),
    });
  }
  function scrollToLastMessage() {
    scrollToMessage.current.scrollIntoView({ behavior: "smooth" });
  }
  // render-----------------------------------------------
  return (
    <ContainerTchat>
      <div className="header">
        <div>
          <span>{usernameTchatteur}</span>
        </div>
        <div>
          <MdInsertEmoticon />
          <FiSettings />
          <RxCross2 onClick={() => setTchat(false)} />
        </div>
      </div>
      <div className="tchat">
        <span className="warningprivacy">
          Ne partagez pas votre mot de passe ni vos informations personnelles.
        </span>
        <div>
          {MessageFromUser.length > 0 &&
            MessageFromUser.map((message, index) => (
              <p key={index}>
                <span className="usernametchatteur">{usernameTchatteur}</span>:{" "}
                {message}
              </p>
            ))}

          {MessageToUser.length > 0 &&
            MessageToUser.map((message, index) => (
              <p key={index}>
                <span className="username"> {username}</span>: {message}
              </p>
            ))}
          <div ref={scrollToMessage}></div>
        </div>
      </div>
      <div className="containerinput">
        <input
          placeholder="Ecrivez ici"
          type="text"
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handlePressEnter}
          value={inputMessage}
        />
      </div>
    </ContainerTchat>
  );
};

export default Tchat;

const ContainerTchat = styled.div`
  background-color: #1f1f23;
  position: fixed;
  width: 290px;
  right: 0px;
  bottom: 0px;
  color: #efeff1;
  font-size: 14px;
  svg {
    font-size: 18px;
    padding: 0 4px;
    cursor: pointer;
  }
  .header {
    background-color: rgb(46, 45, 45);
    display: flex;
    justify-content: space-between;

    padding: 5px 10px;
    align-items: center;
  }
  .tchat {
    padding: 10px;
    line-height: 1.2;
    height: 200px;
    overflow: auto;
    overflow-wrap: break-word;
  }
  .warningprivacy {
    color: grey;
  }
  .tchat p {
    padding-top: 8px;
  }
  .usernametchatteur {
    color: red;
  }
  .username {
    color: white;
  }
  .containerinput {
    padding: 10px;
    position: relative;
  }
  input {
    width: 100%;
    height: 25px;
  }
`;
