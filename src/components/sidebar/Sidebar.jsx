import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowBarLeft, BsArrowDownUp } from "react-icons/bs";
import Minicard from "./MiniCard";
import DisplayButtons from "./DisplayButtons";

const Sidebar = () => {
  // state,donnée-----------------------------------------------
  // const [sidebar, setSidebar] = useState(true);
  const [streamersFollowedData, setStreamersFollowedData] = useState([]);
  const [streamersRecommandedData, setStreamersRecommandedData] = useState([]);
  const [DisplayedFollowedStreamer, setDisplayedFollowedStreamer] =
    useState(11);
  const [DisplayedRecommandedStreamer, setDisplayedRecommandedStreamer] =
    useState(7);

  // comportment-----------------------------------------------
  useEffect(() => {
    getStreamersFollowedData();
    getStreamersRecommandedData();
  }, []);

  function getStreamersFollowedData() {
    fetch("http://localhost:3004/streamersfollowed")
      .then((res) => res.json())
      .then((data) => setStreamersFollowedData(data));
  }
  function getStreamersRecommandedData() {
    fetch("http://localhost:3004/streamersrecommanded")
      .then((res) => res.json())
      .then((data) => setStreamersRecommandedData(data));
  }

  // render-----------------------------------------------
  return (
    <SidebarContainer>
      <div className="foryou">
        <p>Pour vous</p>
        <BsArrowBarLeft />
      </div>
      <div className="containerfollowedchannels">
        <div className="followedchannels title">
          <p>CHAINES SUIVIES</p>
          <BsArrowDownUp />
        </div>
        <div className="streamerlist followed">
          {streamersFollowedData.map(
            (streamer) =>
              streamer.id <= DisplayedFollowedStreamer && (
                <Minicard
                  key={streamer.id}
                  streamer={streamer}
                  category="followed"
                />
              )
          )}

          <DisplayButtons
            displayedStreamer={DisplayedFollowedStreamer}
            setDisplayedStreamer={setDisplayedFollowedStreamer}
            streamersDataLength={streamersFollowedData.length}
          />
        </div>
      </div>
      <div className="containerrecommandedchannels">
        <div className="recommandedchannel title">
          <p>CHAINES RECOMMANDEES</p>
        </div>
        <div className="streamerlistrecommanded">
          {streamersRecommandedData.map(
            (streamer) =>
              streamer.id <= DisplayedRecommandedStreamer && (
                <Minicard
                  key={streamer.id}
                  streamer={streamer}
                  category="recommanded"
                />
              )
          )}
        </div>
        <DisplayButtons
          displayedStreamer={DisplayedRecommandedStreamer}
          setDisplayedStreamer={setDisplayedRecommandedStreamer}
          streamersDataLength={streamersRecommandedData.length}
        />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
const SidebarContainer = styled.div`
  background-color: var(--color2);
  color: var(--color4);
  min-width: 230px;
  padding: 13px;
  overflow: auto;

  .foryou {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--fontsize1);
    font-weight: var(--fontweight1);
  }
  .foryou svg {
    font-size: 20px;
    height: 15px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    font-weight: var(--fontweight1);
    font-size: 13px;
    margin: 10px 0;
  }
  .streamerlistrecommanded {
    display: flex;
    flex-direction: column;
  }
`;
