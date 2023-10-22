import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useInfoContext } from "../../context/infoContext";
const Minicard = (props) => {
  // données
  const { setStreamerCategory } = useInfoContext();

  //comportement
  function handleCategory() {
    if (props.category == "followed") {
      setStreamerCategory("streamersfollowed");
    } else if (props.category == "recommanded") {
      setStreamerCategory("streamersrecommanded");
    }
  }
  //
  return (
    <Container>
      <NavLink
        to={"/" + props.streamer.name + "/" + props.streamer.id}
        onClick={handleCategory}
      >
        <img src={props.streamer.profilepicture} />
        <div className="insidestreamer">
          <div className="streamernamegame">
            <p className="username">{props.streamer.name}</p>
            <p className="game">{props.streamer.livegame}</p>
          </div>
          <span className="viewer">{props.streamer.viewers}</span>
        </div>
      </NavLink>
    </Container>
  );
};

export default Minicard;

const Container = styled.div`
  :hover {
    background-color: grey;
    cursor: pointer;
  }
  padding-top: 7px;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    float: left;
    margin: 1px;
  }
  .insidestreamer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .streamernamegame {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    width: 65%;
  }
  .viewer {
    position: relative;
    font-size: 15px;
  }
  .viewer::before {
    content: "";
    background-color: red;
    border-radius: 50%;
    width: 0.6em;
    height: 0.6em;
    display: inline-block;
    margin-right: 0.5em;
  }

  .streamernamegame p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .game {
    color: var(--color3);
  }
`;
