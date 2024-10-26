import { getUrlsByUser } from "@/actions/url.actions";
import { Link2 } from "lucide-react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default async function ShortenerContainer() {
  const { urls } = await getUrlsByUser();

  return (
    <div>
      <ShortenForm />
      {urls?.length ? (
        <UrlList shortenUrl={urls} />
      ) : (
        <div className="mx-auto flex max-w-64 flex-col items-center justify-center text-neutral-700">
          <Link2 size={48} />
          <p className="text-center text-lg">
            No URLs shortened yet.
          </p>
        </div>
      )}
    </div>
  );
}
