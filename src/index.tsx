import * as React from "react";
import * as ReactDOM from "react-dom";
import Login from "./Components/Login/Login";
import "./index.scss";

const App = () => {
  return <Login />;
};

ReactDOM.render(<App />, document.getElementById("app-root"));
