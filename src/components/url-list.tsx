import { CopyIcon, Eye, Link2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function UrlList() {
  return (
    <div className="">
      <h2 className="mb-2 text-2xl font-normal">Recent URLs</h2>
      <ul className="flex flex-col space-y-3">
        <li className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-200 px-3 py-2 text-neutral-600 transition-colors hover:bg-card">
          <Link
            href="https://google.com"
            target="_blank"
            className="max-w-[165px] overflow-x-hidden">
            https://google.comgoogle.comgoogle.com
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Eye className="mr-2" size={16} />
              1.2 K
            </span>
            <span className="text-neutral-300">|</span>
            <button title="Copy" className="rounded-full bg-secondary p-2">
              <CopyIcon size={16} />
            </button>
            <button title="Delete" className="rounded-full bg-secondary p-2">
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      </ul>

      <div className="flex flex-col items-center justify-center text-neutral-700">
        <Link2 size={48} />
        <p className="text-lg">Start shortening your URLs now!</p>
      </div>
    </div>
  );
}
