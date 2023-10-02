import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineBell,
  AiOutlineHeart,
  AiTwotoneBell,
} from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import { MdKeyboardBackspace } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useInfoContext } from "../context/infoContext";
import OptionsStreamer from "../components/main/home/OptionsStreamer";
import SubscribeModal from "../components/main/home/SubscribeModal";

const Streamer = () => {
  // données
  const [streamerData, setStreamerData] = useState([]);
  const [heartMouseHover, setHeartMouseHover] = useState(false);
  const [bellMouseHover, setBellMouseHover] = useState(false);
  const [follow, setFollow] = useState();
  const [notification, setNotification] = useState();
  const { streamerCategory } = useInfoContext();
  let params = useParams();

  // comportement
  useEffect(() => {
    fetchDataStreamer();
  }, [params.streamerid]);

  function fetchDataStreamer() {
    fetch(`http://localhost:3004/${streamerCategory}/${params.streamerid}`)
      .then((res) => res.json())
      .then((data) => {
        setStreamerData(data);
        setFollow(data.followed);
        setNotification(data.notification);
      });
  }

  function followButton() {
    setFollow(!follow);
    fetch(`http://localhost:3004/streamersrecommanded/${params.streamerid}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        followed: !follow,
      }),
    });
    if (!follow) {
      const name = streamerData.name;
      let date = new Date();
      console.log(date.toLocaleDateString());
      axios.post(`http://localhost:3004/subscriptions`, {
        name,
        date,
      });
    }
  }
  function notificationButton() {
    setNotification(!notification);
    fetch(`http://localhost:3004/streamersrecommanded/${params.streamerid}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        notification: !notification,
      }),
    });
  }

  // render
  return (
    <ContainerMain>
      <div>
        <NavLink to="/">
          <MdKeyboardBackspace className="backhomeicon" />
        </NavLink>
      </div>
      <div className="liveimg">
        <img src={streamerData.liveimg} width="70%" />
      </div>
      <div className="header">
        <div className="headerleft">
          <img
            src={streamerData.profilepicture}
            alt={`profilepicture${streamerData.name}`}
            height="64px"
            width="64px"
          />
          <div className="namefollowers">
            <h2>{streamerData.name}</h2>
            <p>{streamerData.followers} followers</p>
          </div>
        </div>
        <div className="headerright">
          <button
            className="icon"
            onMouseOver={() => setHeartMouseHover(true)}
            onMouseOut={() => setHeartMouseHover(false)}
            onClick={followButton}
          >
            {follow ? <AiFillHeart /> : <AiOutlineHeart />}
            {heartMouseHover && (
              <div className="warningmessage">
                {follow ? "Ne plus suivre" : "Suivre"}
              </div>
            )}
          </button>
          <button
            className="icon"
            onMouseOver={() => setBellMouseHover(true)}
            onMouseOut={() => setBellMouseHover(false)}
            onClick={notificationButton}
          >
            {notification ? <AiTwotoneBell /> : <AiOutlineBell />}
            {bellMouseHover && (
              <div className="warningmessage">
                {notification ? "Desactiver les notifs" : "Activer les notifs"}
              </div>
            )}
          </button>
          <SubscribeModal streamerData={streamerData} />
          <OptionsStreamer streamer={streamerData} />
        </div>
      </div>
      <ul className="tablist">
        <li>Accueil</li>
        <li>Bio</li>
        <li>Programme</li>
        <li>Vidéos</li>
        <li>
          <BsArrowUpRight /> Chat
        </li>
      </ul>
    </ContainerMain>
  );
};

export default Streamer;

const ContainerMain = styled.div`
  overflow: auto;
  width: 100%;
  background-color: #141416;
  color: var(--color4);
  padding: 5px 30px;

  .backhomeicon {
    font-size: 30px;
    cursor: pointer;
  }
  .liveimg {
    text-align: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerleft {
    display: flex;
    align-items: center;
  }
  .headerleft img {
    border-radius: 50%;
    border: 2px solid grey;
    margin-right: 10px;
  }
  .headerright {
    display: flex;
    align-items: center;
  }
  .headerright > * {
    position: relative;
    margin-right: 10px;
    background-color: rgba(83, 83, 95, 0.38);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
  }
  .warningmessage {
    position: absolute;
    text-wrap: nowrap;
    background-color: var(--color4);
    color: black;
    padding: 3px;
    border-radius: 4px;
    font-weight: bold;
    top: -100%;
    transform: translateX(-50%);
  }
  .subscribe:hover {
    background-color: var(--color7);
  }
  .tablist {
    display: flex;
    gap: 30px;
    margin: 30px 0;
    font-weight: bold;
    font-size: 17px;
  }
  .tablist li:hover {
    cursor: pointer;
    color: var(--color5);
  }
  .modalcontainer {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.85);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  }
  .modalcontent {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color2);
    width: 350px;
    border-radius: 10px;
    padding: 15px;
    z-index: 5000;
    max-height: 70vh;
    overflow: auto;
  }
  .modalheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modalheader img {
    height: 50px;
    border-radius: 50%;
  }
  .modalmid {
    margin: 20px 0;
  }
  .modalfooter button {
    color: white;
    padding: 7px;
    background-color: var(--color6);
    border: none;
    font-weight: bold;
    border-radius: 5px;
  }
  .modalfooter button:hover {
    background-color: var(--color7);
  }
`;
