import styled from "styled-components";
const ButtonMore = (props) => {
  //comportement ----------------------------------------------------
  function handleButton() {
    if (props.displayedStreamer === 4 || props.displayedStreamer === 8)
      props.setDisplayedStreamer(props.displayedStreamer + 4);
    else if (props.displayedStreamer !== 4 && props.displayedStreamer !== 8) {
      props.setDisplayedStreamer(4);
    }
  }
  // render ----------------------------------------------------
  return (
    <Container>
      <div className="separator"></div>
      <button className="button" onClick={handleButton}>
        {props.displayedStreamer == 4 || props.displayedStreamer == 8 ? (
          <span>Afficher plus</span>
        ) : (
          <span>Afficher moins</span>
        )}
      </button>
      <div className="separator"></div>
    </Container>
  );
};

export default ButtonMore;

const Container = styled.div`
display: flex;
margin: 15px 0;

.separator {
  flex-grow: 1;
}
} 
.button {
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
  padding: 5px 20px;
  font-size: 15px;
  color: var(--color5);
}
.button:hover {
  background-color: grey;
}
`;
