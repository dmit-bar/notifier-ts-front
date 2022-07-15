import Cookies = require("js-cookie");
import React = require("react");

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: null,
});

export const ThemeProvider = ({ children }) => {
  const currentTheme = Cookies.get("theme");
  const [theme, setTheme] = React.useState<string>(currentTheme || "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
