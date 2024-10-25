import SignUpForm from "@/components/auth/signup-form";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Signup() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-secondary p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="flex w-full flex-col justify-center space-y-10 p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <Image
              className="mx-auto size-20"
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <h1 className="text-2xl font-bold text-primary">
              Sign up to URL Shortener
            </h1>
            <p className="text-muted-foreground">
              Enter your details below to create an account
            </p>
          </div>
          <SignUpForm />
          <Link
            href="/signin"
            className="block text-center text-primary hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
        <Image
          src="/girl.png"
          alt="auth"
          className="hidden w-1/2 object-cover md:block"
          width={700}
          height={500}
        />
      </div>
    </main>
  );
}