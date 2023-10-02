import { FaTwitch } from "react-icons/fa";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Info from "./Info";
import Message from "./Message";
import PrimeGaming from "./PrimeGaming";
import Bits from "./Bits";
import Turbo from "./Turbo";
import Profil from "./Profil";
import { useState } from "react";

const Navbar = () => {
  // données
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  // comportement
  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue !== "") {
      navigate("/search/" + searchValue);
    }
  }
  //render
  return (
    <Navbarcontainer>
      <div className="navbarleft">
        <div>
          <NavLink to="/">
            <FaTwitch className="logotwitch" />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/directory/following"
            className={(nav) => (nav.isActive ? "isActive" : "")}
          >
            <span>Suivis</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/directory/parcourir"
            className={(nav) => (nav.isActive ? "isActive" : "")}
          >
            <span>Parcourir</span>
          </NavLink>
        </div>
        <Info />
      </div>

      {/* INPUT */}

      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter to search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>

      {/* INPUT */}

      <div className="navbarright">
        <div>
          <PrimeGaming />
        </div>
        <Notification />
        <div>
          <Message />
        </div>
        <div>
          <Bits />
        </div>
        <div>
          <Turbo />
        </div>
        <div>
          <Profil />
        </div>
      </div>
    </Navbarcontainer>
  );
};

export default Navbar;

const Navbarcontainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--color1);
  height: 49px;
  align-items: center;
  font-size: 15px;
  color: var(--color4);
  svg,
  img {
    cursor: pointer;
  }

  .navbarleft {
    display: flex;
    gap: 35px;
    font-size: var(--fontsize1);
    align-items: center;
    font-weight: 600;
  }

  .search {
    height: 65%;
    position: relative;
    width: 350px;
  }

  form input {
    width: 100%;
    height: 33px;
  }

  .navbarright {
    display: flex;
    gap: 35px;
    padding: 5px;
    align-items: center;
  }
  .logotwitch {
    font-size: 20px;
    margin-left: 10px;
  }

  .popupinfo {
    background-color: red;
  }

  @media screen and (max-width: 773px) {
    .navbarmid input {
      display: none;
    }
  }
`;
