import { createContext, useState } from "react";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState();

    const updateSession = (value) => {
        setSession(value);
    }
  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
}
export default SessionContext;