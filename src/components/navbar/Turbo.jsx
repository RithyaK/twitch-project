import { useEffect, useRef, useState } from "react";
import { RiBatteryChargeFill } from "react-icons/ri";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { PiTelevisionSimpleLight, PiMoneyLight } from "react-icons/pi";
const Turbo = () => {
  // donnée -----------------------------------------------
  const [menuBattery, setMenuBattery] = useState(false);
  let menuBatteryRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    let handler = (e) => {
      if (!menuBatteryRef.current.contains(e.target)) {
        setMenuBattery(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // render -----------------------------------------------
  return (
    <div ref={menuBatteryRef}>
      <RiBatteryChargeFill
        onClick={() => {
          setMenuBattery(!menuBattery);
        }}
      />
      {menuBattery && (
        <ContainerMenuBattery>
          <div className="headerbattery">
            <div></div>
            <h4>Regarder sans publicité grâce à Turbo</h4>
            <RxCross2
              onClick={() => {
                setMenuBattery(false);
              }}
            />
          </div>
          <div className="contentmenubattery">
            <img
              src="https://static-cdn.jtvnw.net/subs-image-assets/turbo-dropdown-logo.svg"
              width="100%"
            />
            <div className="coretextmenubattery">
              <h3>Regardez tous vos streams sans publicité</h3>
              <p>11,99$/mois</p>
              <p>Soutenez les streamers sans interruption.</p>
            </div>
            <div className="contentbottommenubattery">
              <div>
                <h4>
                  <PiTelevisionSimpleLight />
                  Visionnage sans publicité
                </h4>
                <p>
                  Regardez vos streams préférés sans publicité vidéo ni
                  bannière, sauf dans le cadre de parrainages de chaîne. Il est
                  possible que vous voyiez encore des promotions activées par
                  les streamers sur leur chaîne et du contenu promu par Twitch
                  sur les autres pages.
                </p>
              </div>
              <div>
                <h4>
                  <PiTelevisionSimpleLight />
                  Stockage des streams prolongé (60 jours)
                </h4>
                <p>
                  Stockez vos vidéos à la demande jusqu'à 60 jours au lieu de
                  14.
                </p>
              </div>
              <div>
                <h4>
                  <PiMoneyLight />5 mois sans engagement
                </h4>
                <p>
                  Dans le cadre de parrainages de chaîne, il est possible que
                  vous voyiez encore des promotions activées par les streamers
                  sur leur chaîne et du contenu promu par Twitch.
                </p>
              </div>
            </div>
            <div className="paymenttextturbo">
              <p>Paiement tous les mois • Annulez à tout moment</p>
              <p>
                Le prix ci-dessous est une estimation et peut être ajusté dans
                le cadre de notre programme de tarification régionale. Le prix
                final sera indiqué au moment du paiement.
              </p>
            </div>
          </div>

          <div className="footermenubattery">
            <button onClick={() => alert("Souscription confirmé ! ")}>
              <RiBatteryChargeFill />
              <span> S'abonner </span>
              <span className="pricebattery"> /11,99$</span>
            </button>
          </div>
        </ContainerMenuBattery>
      )}
    </div>
  );
};

export default Turbo;

const ContainerMenuBattery = styled.div`
  transform: translateX(-95%);
  z-index: 1;
  width: 348px;
  position: absolute;
  background-color: var(--color2);
  border-radius: 10px;
  .headerbattery {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;

    line-height: 1.5;
  }
  h4 {
    display: flex;
    margin-top: 8px;
  }
  svg {
    font-size: 17px;
  }
  .contentmenubattery {
    max-height: 50vh;
    overflow: auto;
  }

  .coretextmenubattery {
    text-align: center;
  }
  .contentbottommenubattery {
    padding: 11px;
  }
  .contentbottommenubattery p,
  .paymenttextturbo p {
    font-size: 13px;
    color: var(--color3);

    padding: 5px;
  }
  .paymenttextturbo {
    text-align: center;
  }
  .footermenubattery {
    float: right;
    padding: 8px;
  }
  .footermenubattery button {
    align-items: center;
    display: flex;
    background-color: var(--color6);
    border: none;
    padding: 6px;
    font-weight: bold;
    border-radius: 5px;
  }
`;
