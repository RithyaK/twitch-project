import { useEffect, useRef, useState } from "react";
import { BsEyeSlashFill, BsThreeDotsVertical } from "react-icons/bs";
import { PiWarningBold } from "react-icons/pi";
import styled from "styled-components";
import ReportModal from "./ReportModal";
const OptionsStreamer = (props) => {
  // données
  const [menuOptions, setMenuOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let menuOptionsRef = useRef();
  // comportement
  useEffect(() => {
    let handler = (e) => {
      if (!menuOptionsRef.current.contains(e.target)) {
        setMenuOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function NotInterested() {
    props.CardRef.current.style.opacity = "0.1";
    props.CardRef.current.style.transform = "translateX(-100%)";
    fetch("http://localhost:3004/streamersrecommanded/" + props.streamer.id, {
      method: "DELETE",
    });
    window.location.reload();
  }

  //render
  return (
    <Options ref={menuOptionsRef}>
      <BsThreeDotsVertical onClick={() => setMenuOptions(!menuOptions)} />
      {menuOptions && (
        <div className="menuoptions">
          <div className="option" onClick={NotInterested}>
            <BsEyeSlashFill /> <span> Pas intéressé</span>
          </div>
          <div className="separator"></div>
          <div className="option" onClick={() => setOpenModal(true)}>
            <PiWarningBold />
            <span> Signaler la chaîne</span>
          </div>
        </div>
      )}
      {openModal && (
        <ReportModal
          streamername={props.streamer.name}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
    </Options>
  );
};

export default OptionsStreamer;

const Options = styled.div`
  position: relative;
  .menuoptions {
    background-color: var(--color2);
    position: absolute;
    padding: 10px;
    inset: auto 0px 100% auto;
    margin-bottom: 8px;
    border-radius: 8px;
    width: 170px;
  }
  .option {
    padding: 5px 0;
  }
  .option:hover {
    background-color: grey;
  }
`;
