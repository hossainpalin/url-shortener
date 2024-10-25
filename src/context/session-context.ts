import { Session, User } from "lucia";
import { createContext } from "react";

interface SessionProviderProps {
  user: User;
  session: Session;
}

export const SessionContext = createContext<SessionProviderProps | null>(null);
