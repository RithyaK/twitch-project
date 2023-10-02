import styled from "styled-components";
import OptionsStreamer from "./OptionsStreamer";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useInfoContext } from "../../../context/infoContext";
const CardStreamer = (props) => {
  // données
  const { streamerCategory, setStreamerCategory } = useInfoContext();
  const CardRef = useRef();

  //comportement
  function handleCategory() {
    if (props.category == "valorant") {
      setStreamerCategory("streamersvalorant");
    } else if (props.category == "recommanded") {
      setStreamerCategory("streamersrecommanded");
    }
  }
  //render
  return (
    <CardStyle key={props.streamer.id} ref={CardRef}>
      <NavLink
        to={"/" + props.streamer.name + "/" + props.streamer.id}
        onClick={handleCategory}
      >
        <img className="liveimg" src={props.streamer.liveimg} />
      </NavLink>
      <div className="liveinfos">
        <img src={props.streamer.profilepicture} />
        <div className="containerinfosname">
          <h4>{props.streamer.livetitle}</h4>
          <p>{props.streamer.name}</p>
          <p>{props.streamer.livegame}</p>
        </div>
        <OptionsStreamer streamer={props.streamer} CardRef={CardRef} />
      </div>
    </CardStyle>
  );
};

export default CardStreamer;

const CardStyle = styled.div`
  transition: 2s ease-out;
  cursor: pointer;
  flex-basis: 20%;
  margin: 0 11px;
  padding-bottom: 20px;
  width: 340px;
  .liveimg {
    height: 198px;
    width: 340px;
  }
  .liveimg:hover {
    transform: translate(5px, -5px);
  }
  .liveinfos {
    display: flex;
    width: 100%;
  }
  .liveinfos img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }
  .containerinfosname {
    width: 80%;
    line-height: 1.3;
  }
  .containerinfosname h4 {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }
  .containerinfosname p {
    color: var(--color3);
  }
  .containerinfosname > *:hover {
    color: var(--color5);
  }
  .liveinfos svg:hover {
    background-color: grey;
  }
`;
