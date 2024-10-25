"use client";

import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ShortenForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const url = formData.get("url") as string;

    console.log(url);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="space-y-4">
        <Input
          className="border border-neutral-200 h-10 w-full"
          name="url"
          type="url"
          placeholder="Shorten a link here..."
          required
        />
        <Button className="w-full h-10 bg-neutral-800">Shorten It!</Button>
      </div>
    </form>
  );
}
