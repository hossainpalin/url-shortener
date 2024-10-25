import { validateUser } from "@/auth";
import SessionProvider from "@/providers/session-provider";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateUser();

  if (!session) {
    redirect("/signin");
  }

  return (
    <SessionProvider value={{ user, session }}>
      <>{children}</>
    </SessionProvider>
  );
}
