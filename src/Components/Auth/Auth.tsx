import React = require("react");

export interface Auth {
  sessionID: string;
  isAuthenticated?: boolean;
}

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
