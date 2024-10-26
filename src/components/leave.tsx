"use client";

import { updateUrlVisits } from "@/actions/url.actions";
import { Url } from "@prisma/client";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface LeaveProps {
  url: Url | undefined;
  error: string | undefined;
}

export default function Leave({ url, error }: LeaveProps) {
  // Handle URL visits
  const handleUrlVisits = async (shortCode: string) => {
    await updateUrlVisits(shortCode);
  };

  return (
    <div className="rounded-lg p-5 shadow-md">
      <Link2 size={64} className="mb-3" />

      <div>
        <h1 className="mb-1 text-2xl font-semibold text-primary">
          Are you sure you want to leave?
        </h1>
        <p className="text-secondary-foreground">
          By clicking the link below, you will be redirected to the following
          URL
        </p>
        {error ? (
          <p className="mt-5 rounded-md bg-red-100 p-2 text-sm text-primary">
            {error}
          </p>
        ) : (
          <p className="mt-5 rounded-md bg-blue-100 p-2 text-sm text-primary">
            {url?.originalUrl}
          </p>
        )}

        <div className="mt-8 flex items-center gap-5">
          <Button
            onClick={() => handleUrlVisits(url?.shortCode as string)}
            disabled={!!error}
            {...(!error && { asChild: true })}>
            <Link href={(url?.originalUrl as string) || "/"}>
              Yes, I want to leave
            </Link>
          </Button>

          <Button asChild variant="destructive">
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
