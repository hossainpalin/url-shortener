"use client";

import { SessionContext } from "@/context/session-context";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
  value: {
    user: any;
    session: any;
  };
}

export default function SessionProvider({
  children,
  value,
}: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
