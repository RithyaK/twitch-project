import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";
const Info = () => {
  // données -----------------------------------------------
  const [menuInfo, setMenuInfo] = useState(false);
  let menuInfoRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    let handler = (e) => {
      if (!menuInfoRef.current.contains(e.target)) {
        setMenuInfo(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // render -----------------------------------------------
  return (
    <Container ref={menuInfoRef}>
      <BsThreeDotsVertical
        onClick={() => {
          setMenuInfo(!menuInfo);
        }}
      />
      {menuInfo && (
        <div className="menuinfocontainer">
          <h5>GÉNÉRAL</h5>
          <ul>
            <li>À propos </li>
            <li>Annonceurs</li>
            <li>Blog</li>
            <li>Carte cadeau Twitch</li>
            <li>Développeurs</li>
            <li>Emplois</li>
            <li>Loot Cave - Boutique de produits dérivés</li>
            <li>Partenaires</li>
            <li>Presse</li>
            <li>Turbo</li>
          </ul>
          <div className="separator"></div>
          <h5>AIDE ET JURIDIQUE</h5>
          <ul>
            <li>Aide</li>
            <li>Choix publicitaires</li>
            <li>Lignes de conduite de la communauté</li>
            <li>Sécurité</li>
            <li></li>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Info;
const Container = styled.div`
  position: relative;
  z-index: 1;
  .menuinfocontainer {
    position: absolute;
    background-color: var(--color2);
    z-index: 1;
    height: 385px;
    width: 150px;
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
    max-height: 50vh;
    font-weight: 500;
  }
  hr {
    margin: 10px;
  }
  .menuinfocontainer ul li {
    font-size: 15px;
    padding: 5px 0;
    line-height: 1.4;
  }
  h5 {
    color: var(--color3);
  }
`;
