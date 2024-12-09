import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { UserContextProvider } from "./utils/contexts/UserContext";
import { GamesContextProvider } from "./utils/contexts/GameContext";

// NOTE FROM JOSHUA

// I REMOVED STRICT MODE CAUSE ITS AFFECTING THE SOCKET CONNECTION

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
//   <React.StrictMode>
    <HashRouter>
      <UserContextProvider>
        <GamesContextProvider>
          <App />
        </GamesContextProvider>
      </UserContextProvider>
    </HashRouter>
//   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
