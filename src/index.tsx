import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Cookies from "js-cookie";
import Login from "./Components/Login/Login";
import "./index.scss";

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: null,
});
const ThemeProvider = ({ children }) => {
  const currentTheme = Cookies.get("theme");
  const [theme, setTheme] = React.useState(currentTheme || "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));
