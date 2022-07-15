import React = require("react");
import { Auth } from "../../API/Model/Auth";

export const AuthContext = React.createContext<{
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}>({
  auth: {
    sessionID: "",
  },
  setAuth: null,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState<Auth>({
    sessionID: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
