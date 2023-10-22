import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiMessageAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { VscBlank } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { BsFillTrashFill } from "react-icons/bs";
import { useChatContext } from "../../context/chatContext";
const Message = () => {
  // states,elements -----------------------------------------------
  const [
    tchat,
    setTchat,
    usernameTchatteur,
    setUsernameTchatteur,
    MessageFromUser,
    setMessageFromUser,
    MessageToUser,
    setMessageToUser,
    ID,
    setID,
  ] = useChatContext();
  const [menuMessage, setMenuMessage] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  let menuMessageRef = useRef();

  //comportement -----------------------------------------------------------------------

  useEffect(() => {
    getConversationsData();
    //
    let handler = (e) => {
      if (!menuMessageRef.current.contains(e.target)) {
        setMenuMessage(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function getConversationsData() {
    fetch("http://localhost:3004/conversations")
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }

  function displayConversation(conversation) {
    setTchat(true);
    setMenuMessage(false);
    setMessageFromUser(conversation.messagefromtheuser);
    setMessageToUser(conversation.messagetotheuser);
    setUsernameTchatteur(conversation.name);
    setID(conversation.id);
  }
  function handleDeleteConversation(deletedConversation) {
    // delete UI
    const newConversations = conversations.filter(
      (conversation) => conversation !== deletedConversation
    );
    setConversations(newConversations);
    // delete backend
    fetch("http://localhost:3004/conversations/" + deletedConversation.id, {
      method: "DELETE",
    });
  }

  //render -----------------------------------------------------------------------
  return (
    <Container ref={menuMessageRef}>
      <BiMessageAlt
        onClick={() => {
          setMenuMessage(!menuMessage);
        }}
      />
      {menuMessage && (
        <div className="menumessagecontainer">
          <div className="headermessage">
            <VscBlank />
            <h4>Chuchotements</h4>
            <div>
              <FiSettings />
              <RxCross2 onClick={() => setMenuMessage(false)} />
            </div>
          </div>
          <div className="containerinput">
            <input
              type="text"
              placeholder="Rechercher une personne"
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>
          <div>
            <ul className="conversations">
              {conversations
                .filter((conversation) =>
                  conversation.name.toLowerCase().includes(inputSearch)
                )
                .map((conversation) => (
                  <li key={conversation.id} value={conversation}>
                    <div
                      className="profileandpseudo"
                      onClick={() => displayConversation(conversation)}
                    >
                      <img
                        className="profilepicture"
                        src={conversation.picture}
                      />
                      {conversation.name}
                    </div>
                    <BsFillTrashFill
                      className="trash"
                      onClick={() => handleDeleteConversation(conversation)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Message;

const Container = styled.div`
  position: relative;
  z-index: 1;
  .menumessagecontainer {
    position: absolute;
    width: 380px;
    transform: translateX(-95%);
    border-radius: 10px;
    background-color: var(--color2);
    padding: 8px;
    border-radius: 10px;
  }
  .headermessage {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 18px;
  }
  .headermessage svg {
    padding: 0 8px;
  }
  .menumessagecontainer input {
    padding: 5px 10px 5px 30px;
    width: 90%;
  }
  .containerinput {
    padding: 5px 10px;
  }
  .menumessagecontainer li {
    border-bottom: 1px solid grey;
    padding: 10px;
  }

  .conversations li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .profilepicture {
    height: 22px;
    width: 22px;
    padding-right: 5px;
  }
  .profileandpseudo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .trash {
    display: none;
  }
  .conversations {
    max-height: 25vh;
    overflow: auto;
  }
  .conversations li:hover > .trash {
    display: block;
  }
`;
