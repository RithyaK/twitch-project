import { useEffect, useRef, useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import styled from "styled-components";
const FilterButtons = (props) => {
  // données -----------------------------------------------
  const [menuFilter, setMenuFilter] = useState(false);
  let menuFilterRef = useRef();
  // comportement -----------------------------------------------
  useEffect(() => {
    let handler = (e) => {
      if (!menuFilterRef.current.contains(e.target)) {
        setMenuFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function handleChoiceOne() {
    props.setAlphabetically(true);
    props.setForYou(false);
    props.setStreamersFollowedData(
      props.streamersFollowedData.toSorted((a, b) =>
        a.name.localeCompare(b.name)
      )
    );
  }

  function handleChoiceTwo() {
    props.setAlphabetically(false);
    props.setForYou(true);
    props.setStreamersFollowedData(props.initialArr);
  }
  // render -----------------------------------------------

  return (
    <Container ref={menuFilterRef}>
      <BsArrowDownUp
        onClick={() => {
          setMenuFilter(!menuFilter);
        }}
      />
      {menuFilter && (
        <div className="menufilter">
          <h3>TRIER PAR :</h3>
          <div
            className={props.alphabetically ? "activechoice" : "choice 1"}
            onClick={handleChoiceOne}
          >
            <FaArrowDown /> <span>Ordre alphabétique</span>
          </div>
          <div
            className={props.forYou ? "activechoice" : "choice 2"}
            onClick={handleChoiceTwo}
          >
            <FaArrowUp /> <span>Recommandé pour vous</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default FilterButtons;

const Container = styled.div`
  position: relative;
  .menufilter {
    z-index: 1;
    position: absolute;
    background-color: var(--color1);
    width: 150px;
    border-radius: 10px;
    padding: 10px;
    transform: translateX(-95%);
  }
  h3 {
    color: var(--color3);
    padding-bottom: 5px;
  }
  .choice {
    padding: 5px 0;
  }
  .choice:hover {
    background-color: grey;
    cursor: pointer;
  }
  .activechoice {
    background-color: var(--color7);
    padding: 5px 0;
  }
`;
