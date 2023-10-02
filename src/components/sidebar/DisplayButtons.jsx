/* eslint-disable */
import styled from "styled-components";

const DisplayButtons = (props) => {
  return (
    <ContainerButtons>
      {props.displayedStreamer < props.streamersDataLength && (
        <button
          onClick={() =>
            props.setDisplayedStreamer(props.displayedStreamer + 5)
          }
        >
          <span>Afficher Plus</span>
        </button>
      )}
      {props.displayedStreamer > 5 && (
        <button
          onClick={() =>
            props.setDisplayedStreamer(
              props.displayedStreamer - props.displayedStreamer + 5
            )
          }
        >
          Afficher moins
        </button>
      )}
    </ContainerButtons>
  );
};

export default DisplayButtons;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
  font-size: 15px;
  color: #bf94ff;

  button:hover {
    text-decoration: underline;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    cursor: pointer;
    outline: inherit;
  }
`;
