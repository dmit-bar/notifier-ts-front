import React = require("react");
import { Session } from "../../API/Model/Session";

export const SessionContext = React.createContext<{
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}>({
  session: {
    id: "",
  },
  setSession: null,
});

export const SessionProvider = ({ children }) => {
  const [session, setSession] = React.useState<Session>({
    id: "",
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
