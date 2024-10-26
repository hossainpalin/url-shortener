"use server";

import { validateUser } from "@/auth";
import prisma from "@/lib/db.config";
import { Url, urlSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";

// Create URL action
export const createUrlAction = async (url: Url) => {
  const { user } = await validateUser();

  try {
    // Check if the user is authenticated
    if (!user) {
      return { error: "You must be authenticated to create a URL" };
    }

    const { originalUrl } = urlSchema.parse(url);

    // Check if the URL already exists
    const existingUrl = await prisma.url.findFirst({
      where: {
        originalUrl: {
          equals: originalUrl,
        },
      },
    });

    if (existingUrl) {
      return { error: "URL already exists" };
    }

    // Create the short code for the URL
    const shortCode = Math.random().toString(36).substring(2, 10);

    // New url stored in the database
    await prisma.url.create({
      data: {
        originalUrl: originalUrl,
        shortCode: shortCode,
        userId: user.id,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong, Please try again" };
  }

  revalidatePath("/");
};

// Get URL action
export const getUrlsByUser = async () => {
  const { user } = await validateUser();

  try {
    // Check if the user is authenticated
    if (!user) {
      return { error: "You must be authenticated to get a URL" };
    }

    // Get the URL from the database
    const urls = await prisma.url.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!urls) {
      return { error: "URL does not exist" };
    }

    return { urls };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong, Please try again" };
  }
};

// Delete URL action
export const deleteUrlAction = async (id: string) => {
  const { user } = await validateUser();

  try {
    // Check if the user is authenticated
    if (!user) {
      return { error: "You must be authenticated to delete a URL" };
    }

    // Check if the URL exists
    const existingUrl = await prisma.url.findFirst({
      where: {
        id: id,
      },
    });

    if (!existingUrl) {
      return { error: "URL does not exist" };
    }

    // Check if the user owns the URL
    if (existingUrl.userId !== user.id) {
      return { error: "You do not have permission to delete this URL" };
    }

    // Delete the URL from the database
    await prisma.url.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong, Please try again" };
  }

  revalidatePath("/");
};
