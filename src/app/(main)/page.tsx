import ShortenerContainer from "@/components/shortener-container";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-5 py-12 md:py-24">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">
          URL Shortener
        </h1>
        <p className="text-secondary-foreground">
          Short your long url easily and share with your friends
        </p>
      </div>

      <ShortenerContainer />
    </main>
  );
}
