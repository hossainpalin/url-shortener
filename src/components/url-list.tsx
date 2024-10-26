import { Url } from "@prisma/client";
import UrlCard from "./url-card";

export default function UrlList({ shortenUrl }: { shortenUrl: Url[] }) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-normal">Recent URLs</h2>
      <ul className="flex h-full max-h-[430px] flex-col space-y-3 overflow-y-auto">
        {shortenUrl.map((url) => (
          <UrlCard key={url.id} url={url} />
        ))}
      </ul>
    </div>
  );
}
