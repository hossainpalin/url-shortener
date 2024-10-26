"use client";

import { createUrlAction } from "@/actions/url.actions";
import { Url, urlSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "./form-status";
import LoadingButton from "./loading-button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export default function ShortenForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<Url>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const onSubmit = (data: Url) => {
    startTransition(async () => {
      const response = await createUrlAction(data);

      if (response?.error) {
        setError(response?.error);
        form.reset();
        return;
      }

      form.reset();
    });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2000);
    }
  }, [error]);

  return (
    <Form {...form}>
      <form
        className="my-5 space-y-4"
        onSubmit={(e) => {
          form.clearErrors();
          form.handleSubmit(onSubmit)(e);
        }}>
        <FormError error={error} />
        <FormField
          control={form.control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-10 border border-muted-foreground/35"
                  placeholder="Shorten your link here..."
                  {...field}
                  type="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          disabled={isPending}
          className="h-10 w-full text-white"
          type="submit">
          {isPending ? "Shortening Link..." : "Shorten Link"}
        </LoadingButton>
      </form>
    </Form>
  );
}
