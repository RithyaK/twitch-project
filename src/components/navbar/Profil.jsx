import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaSortAmountDown } from "react-icons/fa";
import { PiPaintBrushBold } from "react-icons/pi";
import { AiOutlineStar } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { WiStars } from "react-icons/wi";
// import { useChatContext } from "../../context/chatContext";
import { SlWallet } from "react-icons/sl";
import { PiCookieLight } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import {
  BsArrowBarLeft,
  BsMoon,
  BsBroadcastPin,
  BsFillClipboard2DataFill,
  BsShield,
} from "react-icons/bs";
import { GiBulletImpacts } from "react-icons/gi";
import { useInfoContext } from "../../context/infoContext";

const Profil = () => {
  // donnée -----------------------------------------------
  // const [usernameTchatteur] = useChatContext();
  const { username } = useInfoContext();
  const [menuProfile, setMenuProfile] = useState(false);
  let menuProfileRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    let handler = (e) => {
      if (!menuProfileRef.current.contains(e.target)) {
        setMenuProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // render -----------------------------------------------
  return (
    <div ref={menuProfileRef} onClick={() => setMenuProfile(!menuProfile)}>
      {/* <p>{usernameTchatteur}</p> */}
      <img
        src="https://static-cdn.jtvnw.net/user-default-pictures-uv/13e5fa74-defa-11e9-809c-784f43822e80-profile_image-70x70.png"
        height="22px"
        width="22px"
      />
      {menuProfile && (
        <Menuprofilecontainer>
          <div className="headerprofile">
            <img
              src="https://static-cdn.jtvnw.net/user-default-pictures-uv/13e5fa74-defa-11e9-809c-784f43822e80-profile_image-70x70.png"
              alt=""
            />
            <span>{username}</span>
          </div>
          <div className="separator"></div>
          <div>
            <ul className="profilelist">
              <li>
                <BsBroadcastPin /> Chaine
              </li>
              <li>
                <FaSortAmountDown /> Studio Vidéo
              </li>
              <li>
                <BsFillClipboard2DataFill />
                Tableau de bord des créateurs
              </li>
              <li>
                <BsShield />
                Sécurité
              </li>
              <div className="separator"></div>
              <li>
                <PiPaintBrushBold />
                Attribution d'émoticônes
              </li>
              <div className="separator"></div>
              <li>
                <AiOutlineStar />
                Abonnements
              </li>
              <li>
                <GoGift />
                Drops et récompenses
              </li>
              <li>
                <SlWallet />
                Portefeuille Twitch
              </li>
              <div className="separator"></div>
              <li>
                <FiSettings /> Paramètres
              </li>
              <li>
                <GiBulletImpacts />
                Paramètres de BetterTTV
              </li>
              <li>
                <WiStars /> Réglage du contenu
              </li>
              <li>
                <GrLanguage /> Langue
              </li>
              <li>
                <BsMoon />
                Thème sombre
              </li>
              <li>
                <PiCookieLight /> Préférences de cookies
              </li>
              <div className="separator"></div>
              <li>
                <BsArrowBarLeft />
                Déconnexion
              </li>
            </ul>
          </div>
        </Menuprofilecontainer>
      )}
    </div>
  );
};

export default Profil;
const Menuprofilecontainer = styled.div`
  position: absolute;
  z-index: 1;
  transform: translateX(-95%);
  border-radius: 10px;
  background-color: var(--color2);
  padding: 5px;
  font-size: 16px;
  max-height: 50vh;
  overflow: auto;
  .headerprofile {
    display: flex;
    align-items: center;
    padding: 8px;
  }
  img {
    border-radius: 50px;
    height: 32px;
    width: 32px;
    margin-right: 8px;
  }
  svg {
    font-size: 15px;
    margin-right: 5px;
  }
  .profilelist {
    white-space: nowrap;
  }
  .profilelist li {
    padding: 5px;
    align-items: center;
    display: flex;
  }
`;
