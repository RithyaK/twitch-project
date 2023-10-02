import { useEffect } from "react";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
const Searched = () => {
  // données
  const [streamers, setStreamers] = useState([]);
  let params = useParams();
  // comportement
  useEffect(() => {
    fetchdataStreamers();
  }, []);

  async function fetchdataStreamers() {
    fetch(`http://localhost:3004/allstreamers`)
      .then((res) => res.json())
      .then((data) => setStreamers(data));
  }

  // render
  return (
    <Main>
      <div>
        <NavLink to="/">
          <MdKeyboardBackspace className="backhomeicon" />
        </NavLink>
        <h1>tag recherché: {params.search}</h1>
        <h3>Ces streamers sont sur Twitch :</h3>
      </div>
      <div className="containercards">
        {streamers
          .filter(
            (streamer) =>
              streamer.name.toLowerCase().includes(params.search) ||
              streamer.livegame.toLowerCase().includes(params.search)
          )
          .map((streamer) => (
            <div key={streamer.id} className="card">
              <a>{streamer.name}</a>
              <img src={streamer.profilepicture} height="100px" width="100px" />
            </div>
          ))}
      </div>
    </Main>
  );
};

export default Searched;

const Main = styled.div`
  overflow: auto;
  width: 100%;
  color: var(--color4);
  background-color: #141416;
  padding: 20px;

  .containercards {
    display: flex;
    flex-wrap: wrap;
  }
  .backhomeicon {
    font-size: 30px;
    cursor: pointer;
  }

  .card {
    width: 200px;
    height: 200px;
    align-items: center;
    display: flex;
    flex-direction: column;
    border: 2px solid grey;
    margin: 10px;
  }
`;
