import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { BiEnvelopeOpen } from "react-icons/bi";
import { BsBox2 } from "react-icons/bs";
import { FaTwitch } from "react-icons/fa";
import { VscBlank } from "react-icons/vsc";
const Notification = () => {
  // données -----------------------------------------------
  const [menuNotification, setMenuNotification] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] =
    useState("mytwitch");
  const [newSubscriptions, setNewSubscriptions] = useState([]);
  let menuNotifRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    getNewSubscriptionsData();
    let handler = (e) => {
      if (!menuNotifRef.current.contains(e.target)) {
        setMenuNotification(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function getNewSubscriptionsData() {
    fetch("http://localhost:3004/subscriptions")
      .then((res) => res.json())
      .then((data) => setNewSubscriptions(data));
  }
  // render -----------------------------------------------
  return (
    <Container ref={menuNotifRef}>
      <BsBox2 onClick={() => setMenuNotification(!menuNotification)} />
      {menuNotification && (
        <div className="menunotificationcontainer">
          <div className="headernotification">
            {activeNotificationTab === "mytwitch" ? (
              <BiEnvelopeOpen />
            ) : (
              <VscBlank />
            )}
            <h3>Notifications</h3>
            <div>
              <FiSettings />
              <RxCross2 onClick={() => setMenuNotification(false)} />
            </div>
          </div>
          <div className="notificationtabs">
            <p
              onClick={() => {
                setActiveNotificationTab("mytwitch");
              }}
              className={activeNotificationTab === "mytwitch" ? "isActive" : ""}
            >
              Mon Twitch
            </p>
            <p
              onClick={() => {
                setActiveNotificationTab("mychannel");
              }}
              className={
                activeNotificationTab === "mychannel" ? "isActive" : ""
              }
            >
              Ma chaîne
            </p>
          </div>
          {activeNotificationTab === "mytwitch" ? (
            <div className="notificationmytwitch">
              <h4>LAST SUBSCRIPSTIONS {`(reload to update)`}</h4>
              <ul className="containerlistmytwitch">
                {newSubscriptions.map((newsubscription, index) => (
                  <li key={index}>
                    <p>{newsubscription.name}</p>
                    <p>{newsubscription.date}</p>
                  </li>
                ))}
                <hr />
                <FaTwitch />
              </ul>
            </div>
          ) : (
            <div className="notificationmychannel">
              <p>Vous n'avez aucun message.</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Notification;
const Container = styled.div`
  position: relative;
  z-index: 1;
  .menunotificationcontainer {
    position: absolute;
    background-color: var(--color2);
    width: 330px;
    transform: translateX(-95%);
    padding: 10px;
    border-radius: 10px;
    max-height: 90vh;
  }
  .headernotification {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid black;
    padding: 5px 0;
  }
  .headernotification svg {
    font-size: 19px;
    padding: 0 3px;
  }
  .notificationtabs {
    display: flex;
    margin-top: 15px;
    cursor: pointer;
  }
  .notificationtabs p {
    width: 50%;
    text-align: center;
    padding: 3px;
  }

  .notificationmytwitch h4 {
    margin-top: 30px;
    color: var(--color3);
  }

  .notificationmytwitch ul li {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid grey;
  }
  .notificationmytwitch svg {
    width: 100%;
  }
  .notificationmychannel {
    text-align: center;
    padding: 50px;
  }
  .containerlistmytwitch,
  .notificationmychannel {
    max-height: 25vh;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  .notificationmychannel svg {
    font-size: 100px;
  }
`;
