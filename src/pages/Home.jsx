import { useEffect, useState } from "react";
import styled from "styled-components";
import CardStreamer from "../components/main/home/CardStreamer";
import ButtonMore from "../components/main/home/ButtonMore";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Home = () => {
  // données -------------------------------------------------
  const [current, setCurrent] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [streamersRecommandedInfo, setStreamersRecommandedInfo] = useState([]);
  const [streamersValorantInfo, setStreamersValorantInfo] = useState([]);
  const [displayedRecommandedStreamer, setDisplayedRecommandedStreamer] =
    useState(4);
  const [displayedValorantStreamer, setDisplayedValorantStreamer] = useState(4);

  // comportement -------------------------------------------------
  useEffect(() => {
    getSliderData();
    getStreamersValorantData();
    getStreamersRecommandedData();
  }, []);
  function nextSlide() {
    setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? sliderData.length - 1 : current - 1);
  }

  function getSliderData() {
    fetch("http://localhost:3004/allstreamers")
      .then((res) => res.json())
      .then((data) => setSliderData(data));
  }

  function getStreamersRecommandedData() {
    fetch("http://localhost:3004/streamersrecommanded")
      .then((res) => res.json())
      .then((data) => setStreamersRecommandedInfo(data));
  }
  function getStreamersValorantData() {
    fetch("http://localhost:3004/streamersvalorant")
      .then((res) => res.json())
      .then((data) => setStreamersValorantInfo(data));
  }
  // render -------------------------------------------------
  return (
    <ContainerMain>
      <section className="slider">
        <MdArrowBackIosNew className="left-arrow" onClick={prevSlide} />
        <MdArrowForwardIos className="right-arrow" onClick={nextSlide} />
        {sliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide.liveimg} alt="travel image" className="image" />
              )}
              {index === current && (
                <div className="sliderstreamerinfo">
                  <img src={slide.profilepicture} />
                  <h3>{slide.name}</h3>
                  <span>{slide.viewers} spectateurs</span>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="midmain">
        <div className="livesrecommanded">
          <h2 className="titleliverecommanded">
            <a href="">Chaînes live</a> qui pourraient vous plaire
          </h2>
          <div className="containerlives">
            {streamersRecommandedInfo.map(
              (streamer) =>
                displayedRecommandedStreamer >= streamer.id && (
                  <CardStreamer
                    streamer={streamer}
                    key={streamer.id}
                    category="recommanded"
                  />
                )
            )}
          </div>
        </div>
        <ButtonMore
          setDisplayedStreamer={setDisplayedRecommandedStreamer}
          displayedStreamer={displayedRecommandedStreamer}
        />
        <div className="livesrecommanded">
          <h2 className="titleliverecommanded">
            Chaînes de <a href="">VALORANT</a> recommandées
          </h2>
          <div className="containerlives">
            {streamersValorantInfo.map(
              (streamer) =>
                displayedValorantStreamer >= streamer.id && (
                  <CardStreamer
                    streamer={streamer}
                    key={streamer.id}
                    category="valorant"
                  />
                )
            )}
          </div>
        </div>
        <ButtonMore
          setDisplayedStreamer={setDisplayedValorantStreamer}
          displayedStreamer={displayedValorantStreamer}
        />
      </div>
    </ContainerMain>
  );
};

export default Home;

const ContainerMain = styled.div`
  overflow: auto;
  width: 100%;
  color: var(--color4);
  background-color: #141416;
  padding: 20px;

  .slider {
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    height: 200px;
  }
  .sliderstreamerinfo {
    background-color: #18181b;
    height: 200px;
    text-align: center;
    padding: 0 20px;
    width: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .sliderstreamerinfo h3 {
    color: var(--color5);
  }
  .sliderstreamerinfo img {
    border-radius: 50%;
  }
  .right-arrow {
    position: absolute;
    top: 50%;
    right: 32px;
    font-size: 3rem;
    cursor: pointer;
    user-select: none;
  }

  .left-arrow {
    position: absolute;
    top: 50%;
    left: 32px;
    font-size: 3rem;
    cursor: pointer;
    user-select: none;
  }

  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }

  .slide.active {
    display: flex;
    align-items: center;
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
    cursor: pointer;
  }

  .carrouselcontainer {
    display: flex;
    height: 350px;
    border: 3px solid grey;
  }
  .livesrecommanded {
  }
  .titleliverecommanded {
    margin: 10px 0;
  }
  .titleliverecommanded a {
    color: var(--color5);
  }
  .containerlives {
    display: flex;
    flex-wrap: wrap;
  }
`;
