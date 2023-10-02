import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";
const PrimeAds = (props) => {
  // données-----------------------------------------------

  // comportement -----------------------------------------------

  function handleDeleteGame(deletingGame) {
    // delete in UI
    const newGames = props.games.filter((game) => game !== deletingGame);
    props.setGames(newGames);
    // delete backend
    fetch("http://localhost:3004/games/" + deletingGame.id, {
      method: "DELETE",
    });
  }

  // render-----------------------------------------------
  return (
    <ContainerDisplayPrimetab>
      <ul>
        {props.games.map((game) => {
          if (props.activePrimeTab === "primetab3" && game.daysleft < 10) {
            return (
              <li className="containergameoffer" key={game.id}>
                <RxCross2 onClick={() => handleDeleteGame(game)} />
                <h2 className="warning">Expired Soon</h2>
                <h4 className="gamename">{game.name}</h4>
                <p className="giftname">{game.gift}</p>
                <img src={game.image} alt={game.name} width="100%" />
                <p>Contenu in Game</p>
                <p className="gamedev">{game.developer}</p>
                <button>
                  <a href="https://www.twitch.tv/jolavanille">
                    Commencez votre essai gratuit
                  </a>
                </button>
              </li>
            );
          } else if (props.activePrimeTab === "primetab2") {
            return (
              <li className="containergameoffer" key={game.id}>
                <RxCross2 onClick={() => handleDeleteGame(game)} />
                <h4 className="gamename">{game.name}</h4>
                <p className="giftname">{game.gift}</p>
                <img src={game.image} alt={game.name} width="100%" />
                <p>Contenu in Game</p>
                <p className="gamedev">{game.developer}</p>
                <button>
                  <a href="https://www.twitch.tv/jolavanille">
                    Commencez votre essai gratuit
                  </a>
                </button>
              </li>
            );
          }
        })}
      </ul>
    </ContainerDisplayPrimetab>
  );
};

export default PrimeAds;

const ContainerDisplayPrimetab = styled.div`
  overflow: auto;
  ul li {
    padding: 10px 20px;
    border-bottom: 1px solid rgba(83, 83, 95, 0.48);
    border-top: 1px solid rgba(83, 83, 95, 0.48);
  }
  .gamename,
  .gamedev {
    color: var(--color3);
  }
  .giftname {
    font-weight: 600;
    font-size: 18px;
  }
`;
