import React from "react";
import ReactDOM from "react-dom";

const App = require("./components/App");
const LoggingService = require("./stores/LoggingService");

// When the window is loaded, render the App component.
window.onload = () => {
  LoggingService();
  ReactDOM.render(<App/>,document.querySelector("#root"));
}