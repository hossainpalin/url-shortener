"use server";

import { lucia, validateUser } from "@/auth";
import prisma from "@/lib/db.config";
import { User, userSchema } from "@/schema";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// User sign up action
export const signUpAction = async (
  credentials: User,
): Promise<{ error: string }> => {
  try {
    const { username } = userSchema.parse(credentials);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return { error: "Username is already taken" };
    }

    const newUser = await prisma.user.create({
      data: {
        username,
      },
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/signin");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong, Please try again" };
  }
};

// User sign in action
export const signInAction = async (
  credentials: User,
): Promise<{ error: string }> => {
  try {
    const { username } = userSchema.parse(credentials);

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return { error: "Invalid username" };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong, Please try again" };
  }
};

// User sign out action
export const signOutAction = async () => {
  const { session } = await validateUser();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/signin");
};
