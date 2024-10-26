import { getUrlByShortCode } from "@/actions/url.actions";
import Leave from "@/components/leave";

interface ShortCodeParams {
  params: {
    code: string;
  };
}

export default async function ShortCode({ params }: ShortCodeParams) {
  const { code } = params;
  const { url, error } = await getUrlByShortCode(code);

  return (
    <main className="flex h-full w-full items-center justify-center p-5">
      <Leave url={url} error={error} />
    </main>
  );
}
