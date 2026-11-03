'use client'
import { ArrowRight, Eye, HeartHandshake, Lock, Mail } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

/*
  VALIDATION — to be added later (no validation runs right now):
  1. Add `onSubmit={(e) => { e.preventDefault(); ... }}` to the <form>.
  2. Read the values: `const data = Object.fromEntries(new FormData(e.currentTarget))`.
  3. Check:
       - email    -> required + /^[^\s@]+@[^\s@]+\.[^\s@]+$/
       - password -> required + minimum 6 characters
  4. Keep the messages in a state object and render them with
     <FieldError errors={[{ message: '...' }]} /> inside the matching <Field>,
     or set `aria-invalid` on the <Input> for the inline styling.
*/

const SignIn = () => {


  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries()) as {name: string, email:string, password: string};
  
      console.log(userData, 'before submit');
  
      const { data, error } = await signIn.email({
        ...userData,
        callbackURL: '/',
      })
  
      console.log(userData, 'after submit');
  
    }



  return (
    <AuthShell>
      <div className="rounded-3xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        {/* Logo badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
          <HeartHandshake className="size-8" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Sign in to organize and join community drives
        </p>

        {/* Form — static markup only, no submit handler wired up */}
        <form
          onClick={handleSignIn}
          className="mt-8 space-y-6">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email" className="font-semibold">
              Email
            </FieldLabel>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="yourname@example.com"
                className="h-12 rounded-xl bg-background dark:bg-background pr-4 pl-11 md:text-sm"
              />
            </div>
          </Field>

          {/* Password */}
          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password" className="font-semibold">
                Password
              </FieldLabel>
             
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl bg-background dark:bg-background pr-12 pl-11 md:text-sm"
              />
              {/* Eye icon is decorative only — no toggle behaviour yet */}
              <Eye
                aria-hidden
                className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </Field>
          <div className="flex justify-end items-center">
            <Link
              href="#"
              className="text-sm font-semibold text-emerald-500 hover:text-emerald-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* Primary action */}
          <Button
            type="button"
            className="h-14 w-full rounded-xl bg-linear-to-r from-emerald-400 to-emerald-500 text-base font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-600"
          >
            Sign In
            <ArrowRight className="size-5" />
          </Button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs font-bold tracking-widest text-muted-foreground">
            OR CONTINUE WITH
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Social sign in */}
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full gap-3 rounded-xl text-base font-semibold dark:bg-transparent"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative Google mark, hidden from assistive tech */}
         <FcGoogle /> 
          Continue with Google
        </Button>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-emerald-500 hover:text-emerald-600"
          >
            Register here
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignIn;
