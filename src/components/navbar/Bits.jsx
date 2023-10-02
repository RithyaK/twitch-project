import { useEffect, useRef, useState } from "react";
import { BiDiamond } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";
const Bits = () => {
  // données -----------------------------------------------
  const [menuBits, setMenuBits] = useState(false);
  let menuBitsRef = useRef();

  // comportement -----------------------------------------------
  useEffect(() => {
    let handler = (e) => {
      if (!menuBitsRef.current.contains(e.target)) {
        setMenuBits(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // render -----------------------------------------------
  return (
    <Container ref={menuBitsRef}>
      <BiDiamond onClick={() => setMenuBits(!menuBits)} />

      {menuBits && (
        <div className="menubitscontainer">
          <div className="headerbits">
            <div></div>
            <div>
              <h5>Achat de Bits</h5>
              <span>Vous avez 0 Bits</span>
            </div>
            <RxCross2 onClick={() => setMenuBits(false)} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Bits;

const Container = styled.div`
  position: relative;
  z-index: 1;
  .menubitscontainer {
    position: absolute;
    background-color: var(--color2);
    transform: translateX(-95%);
    width: 400px;
    height: 500px;
  }
  .headerbits {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    text-align: center;
    align-items: center;
    border-bottom: 1px solid black;
  }
`;
