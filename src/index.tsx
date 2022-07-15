import * as React from "react";
import * as ReactDOM from "react-dom";
import { LOADING_STATE } from "./API/const";
import { setupAuth } from "./API/session";
import { AuthContext, AuthProvider } from "./Components/Auth/Auth";
import Login from "./Components/Login/Login";
import { ThemeProvider } from "./Components/Theme/Theme";
import "./index.scss";

// Setting up service worker for mocking API
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./API/mocks/browser");
  worker.start();
}

const App = () => {
  const { setAuth } = React.useContext(AuthContext);
  const [loadingState, setLoadingState] = React.useState<LOADING_STATE>(
    LOADING_STATE.PENDING
  );

  React.useEffect(() => {
    setupAuth()
      .then((res) => {
        setAuth({ ...res });
        setLoadingState(LOADING_STATE.FULFILLED);
      })
      .catch((e: Error) => {
        console.error(e.stack);
        setLoadingState(LOADING_STATE.REJECTED);
      });
  }, []);

  let renderComponent: JSX.Element = <span>loading...</span>;
  switch (loadingState) {
    case LOADING_STATE.FULFILLED:
      renderComponent = <Login />;
      break;
    case LOADING_STATE.REJECTED:
      renderComponent = <span>{"🥹 Sowwy, somewing is nawt wowking 🥹"}</span>;
      break;
  }

  return renderComponent;
};

const Root = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("app-root")
);
