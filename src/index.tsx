import * as Cookies from "js-cookie";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { getAuthInfo } from "./API/session";
import Login from "./Components/Login/Login";
import "./index.scss";
import { Auth, AUTH_SESSION_ID } from "./Model/Auth/Auth";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./API/mocks/browser");
  worker.start();
}

export const AuthContext = React.createContext<{
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}>({
  auth: {
    session: "",
    token: "",
  },
  setAuth: null,
});
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState<Auth>({
    session: "",
    token: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: null,
});
const ThemeProvider = ({ children }) => {
  const currentTheme = Cookies.get("theme");
  const [theme, setTheme] = React.useState<string>(currentTheme || "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

const App = () => {
  const { setAuth } = React.useContext(AuthContext);

  React.useEffect(() => {
    // TODO Logic when user is already authenticated (auth-session-id is present in cookies and not expired)
    getAuthInfo().then((res) => {
      setAuth({ ...res });
    });
  }, []);

  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("app-root")
);
