"use client";

import { deleteUrlAction } from "@/actions/url.actions";
import { formatNumber } from "@/lib/utils";
import { Url } from "@prisma/client";
import { CheckIcon, CopyIcon, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function UrlCard({ url }: { url: Url }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // Shortener URL
  const shortenerUrl = (code: string) => `tinyx-url.vercel.app/${code}`;

  // Delete URL
  const handleDeleteUrl = (id: string) => {
    startTransition(async () => {
      await deleteUrlAction(id);
    });
  };

  // Copy URL
  const handleCopyUrl = (url: string) => {
    setCopySuccess(true);
    navigator.clipboard.writeText(url);
  };

  // Handle copy success effect
  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => setCopySuccess(false), 1000);
    }
  }, [copySuccess]);

  // Handle visibility change effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };

    addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <li className="flex flex-wrap items-center justify-between gap-y-2 rounded-md border border-neutral-200 bg-neutral-200 px-3 py-2 text-neutral-600 transition-colors hover:bg-card">
      <Link href={`/${url.shortCode}`} target="_blank">
        {shortenerUrl(url.shortCode)}
      </Link>

      <div className="flex items-center gap-3">
        <span className="flex items-center">
          <Eye className="mr-2" size={16} />
          {formatNumber(url.visits as number)}
        </span>

        <span className="text-neutral-300">|</span>

        <button
          onClick={() => handleCopyUrl(url.shortCode)}
          title="Copy"
          className="rounded-full bg-secondary p-2">
          {copySuccess ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </button>

        <button
          onClick={() => handleDeleteUrl(url.id)}
          title="Delete"
          className="rounded-full bg-secondary p-2">
          {isPending ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </li>
  );
}
