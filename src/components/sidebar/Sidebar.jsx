import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BsArrowBarLeft, BsArrowDownUp } from "react-icons/bs";
import Minicard from "./MiniCard";
import DisplayButtons from "./DisplayButtons";
import FilterButtons from "./FilterButtons";

const Sidebar = () => {
  // state,donnée-----------------------------------------------
  // const [sidebar, setSidebar] = useState(true);
  const [streamersFollowedData, setStreamersFollowedData] = useState([]);
  const [initialArr, setInitialArr] = useState([]);

  const [streamersRecommandedData, setStreamersRecommandedData] = useState([]);
  const [DisplayedFollowedStreamer, setDisplayedFollowedStreamer] =
    useState(11);
  const [DisplayedRecommandedStreamer, setDisplayedRecommandedStreamer] =
    useState(7);
  const [forYou, setForYou] = useState(false);
  const [alphabetically, setAlphabetically] = useState(false);
  // comportment-----------------------------------------------
  useEffect(() => {
    getStreamersFollowedData();
    getStreamersRecommandedData();
  }, []);

  function getStreamersFollowedData() {
    fetch("http://localhost:3004/streamersfollowed")
      .then((res) => res.json())
      .then((data) => {
        setInitialArr(data);
        setStreamersFollowedData(data);
      });
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
          <div>
            <p>CHAINES SUIVIES</p>
            {alphabetically && <p>Ordre alphabétique</p>}
          </div>
          <FilterButtons
            initialArr={initialArr}
            forYou={forYou}
            setForYou={setForYou}
            streamersFollowedData={streamersFollowedData}
            alphabetically={alphabetically}
            setAlphabetically={setAlphabetically}
            setStreamersFollowedData={setStreamersFollowedData}
          />
        </div>
        <div className="streamerlist followed">
          {/* {alphabetically
            ? streamersFollowedData
                .toSorted((a, b) => a.name.localeCompare(b.name))
                .map(
                  (streamer) =>
                    streamer.id <= DisplayedFollowedStreamer && (
                      <Minicard
                        key={streamer.id}
                        streamer={streamer}
                        category="followed"
                      />
                    )
                )
            :  */}
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
  .foryou svg:hover,
  .containerfollowedchannels svg:hover {
    cursor: pointer;
  }
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin: 10px 0;
  }
  .streamerlistrecommanded {
    display: flex;
    flex-direction: column;
  }
`;
