import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Following from "./pages/Following";
import Parcourir from "./pages/Parcourir";
import Tchat from "./components/tchat/Tchat";
import styled from "styled-components";
import { useChatContext } from "../src/context/chatContext";
import Sidebar from "./components/sidebar/Sidebar";
import Streamer from "./pages/Streamer";
import Searched from "./pages/Searched";
function App() {
  //
  const [tchat, setTchat] = useChatContext();

  //
  return (
    <BrowserRouter>
      <Navbar />
      <Main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:search" element={<Searched />} />
          <Route path="/directory/following" element={<Following />} />
          <Route path="/directory/parcourir" element={<Parcourir />} />
          <Route path="/:streamername/:streamerid" element={<Streamer />} />
        </Routes>
      </Main>
      {tchat && <Tchat />}
    </BrowserRouter>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  overflow: hidden;
  height: calc(100vh - 49px);
`;
