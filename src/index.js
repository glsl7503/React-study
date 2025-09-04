import React from "react";
import ReactDOM from "react-dom/client";

// 보고 싶은 앱 선택
// import App from "./tic-tac-toe/App";
import App from "./list-grid-view/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
