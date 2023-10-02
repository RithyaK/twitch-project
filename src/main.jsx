import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChatContextProvider } from "./context/chatContext.jsx";
import { InfoContextProvider } from "./context/infoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InfoContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </InfoContextProvider>
  </React.StrictMode>
);
