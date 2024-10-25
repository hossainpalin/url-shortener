import { validateUser } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await validateUser();

  if (user) {
    return redirect("/");
  }

  return (
    <>
      {children}
    </>
  );
}
