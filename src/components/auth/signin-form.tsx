"use client";

import { User, userSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../form-status";
import LoadingButton from "../loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { signInAction } from "@/actions/auth.actions";

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, starTransition] = useTransition();

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: User) => {
    starTransition(async () => {
      const { error } = await signInAction(data);
      if (error) {
        setError(error);
        return;
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          form.clearErrors();
          form.handleSubmit(onSubmit)(e);
        }}>
        <FormError error={error} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          disabled={isPending}
          className="w-full text-white"
          type="submit">
          {isPending ? "Signing..." : "Sign In"}
        </LoadingButton>
      </form>
    </Form>
  );
}
