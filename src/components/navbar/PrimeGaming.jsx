import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { PiCrownSimpleBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import PrimeAds from "./PrimeAds";
const PrimeGaming = () => {
  // données -----------------------------------------------
  const [activePrimeTab, setActivePrimeTab] = useState("primetab1");
  const [menuPrime, setMenuPrime] = useState(false);
  const [games, setGames] = useState([]);
  let menuPrimeRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    //
    getGamesData();
    //
    let handler = (e) => {
      if (!menuPrimeRef.current.contains(e.target)) {
        setMenuPrime(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function getGamesData() {
    fetch("http://localhost:3004/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }
  // render -----------------------------------------------
  return (
    <Container ref={menuPrimeRef}>
      <PiCrownSimpleBold onClick={() => setMenuPrime(!menuPrime)} />

      {menuPrime && (
        <div className="menuprimegamingcontainer">
          <div className="header">
            <img
              src="
https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Prime_gaming_logo.svg/1280px-Prime_gaming_logo.svg.png"
              width="100px"
            />
            <RxCross2 onClick={() => setMenuPrime(false)} />
          </div>
          <div className="containersubscribe">
            <h3>Musclez votre jeu</h3>
            <div>
              <MdVerified />
              <span> Inclus dans Amazon Prime</span>
            </div>
            <p>
              Obtenez un abonnement mensuel gratuit à la chaîne Twitch de votre
              streamer·euse préféré·e, des jeux gratuits et du contenu en jeu.
            </p>

            <button>
              <a href="https://www.twitch.tv/jolavanille">
                Découvrir Prime Gaming <BsArrowUpRight />{" "}
              </a>
            </button>
            <div className="containerbottomsubscribe">
              <p>Vous possédez déjà Amazon Prime ?</p>
              <p>
                Connectez-vous <BsArrowUpRight />
              </p>
            </div>
          </div>
          <div>
            <ul className="primetabs">
              <li
                onClick={() => setActivePrimeTab("primetab1")}
                className={activePrimeTab === "primetab1" ? "isActive" : ""}
              >
                Pour vous
              </li>
              <li
                onClick={() => setActivePrimeTab("primetab2")}
                className={activePrimeTab === "primetab2" ? "isActive" : ""}
              >
                Jeux
              </li>
              <li
                onClick={() => setActivePrimeTab("primetab3")}
                className={activePrimeTab === "primetab3" ? "isActive" : ""}
              >
                Bientôt terminé
              </li>
            </ul>
          </div>

          {activePrimeTab === "primetab2" && (
            <PrimeAds
              games={games}
              setGames={setGames}
              activePrimeTab={activePrimeTab}
            />
          )}

          {activePrimeTab === "primetab3" && (
            <PrimeAds
              games={games}
              setGames={setGames}
              activePrimeTab={activePrimeTab}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default PrimeGaming;

const Container = styled.div`
  position: relative;
  z-index: 1;
  .menuprimegamingcontainer {
    position: absolute;
    width: 355px;
    transform: translateX(-95%);
    border-radius: 10px;
    background-color: var(--color2);
    overflow: auto;
    line-height: 1.5;
    max-height: 70vh;
  }
  .containerbottomsubscribe p {
    font-size: 14px;
    text-align: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid black;
  }
  .containersubscribe {
    padding: 0 13px;
  }
  .containersubscribe > * {
    margin: 8px;
  }
  .warning {
    color: red;
  }
  .containersubscribe button,
  .containergameoffer button {
    background-color: #1a98ff;
    border: none;
    width: 100%;
    color: #232f3e;
    font-weight: 600;
    height: 35px;
    margin: 0px;
  }
  .primetabs {
    display: flex;
    justify-content: space-around;
    padding: 20px 0 10px 0;
    border-top: 1px solid grey;
    margin: 8px;
    cursor: pointer;
  }
`;
