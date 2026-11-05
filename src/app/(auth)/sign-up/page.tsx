'use client'
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  Image as ImageIcon,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

/*
  VALIDATION — to be added later (no validation runs right now):
  1. Add `onSubmit={(e) => { e.preventDefault(); ... }}` to the <form>.
  2. Read the values: `const data = Object.fromEntries(new FormData(e.currentTarget))`.
  3. Check:
       - fullName    -> required, trimmed length >= 3
       - email       -> required + /^[^\s@]+@[^\s@]+\.[^\s@]+$/
       - photoUrl    -> optional, but must start with http:// or https:// when filled
       - password    -> required + /A-Z/ + /a-z/ + minimum 6 characters
  4. Keep the messages in a state object and render them with
     <FieldError errors={[{ message: '...' }]} /> inside the matching <Field>,
     or set `aria-invalid` on the <Input> for the inline styling.
*/

const SignUp = () => {

  const handleGoogleSignIn = async () => {
      const data = await signIn.social({
        provider: 'google'
      })
      toast.success('Sign in successfull!!')
      
    }
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {name: string, email:string, image:string, password: string};

    console.log(userData, 'before submit');

    const { data, error } = await signUp.email({
      ...userData
    })

    if (data?.user) {
      toast.success('Account created successfully.')
    } else {
      toast.error('Something went wrong!!')
      
    }

  }



  return (
    <AuthShell>
      <div className="rounded-3xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        {/* Logo badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
          <HeartHandshake className="size-8" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Create Account
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Join the community and start driving social change
        </p>

        {/* Form — static markup only, no submit handler wired up */}
        <form
          onSubmit={handleSignUp}
          className="mt-8">
          <FieldGroup className="gap-6">
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName" className="font-semibold">
               Name
              </FieldLabel>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="name"
                  type="text"
                  placeholder="Karim Talukder"
                  className="h-12 rounded-xl bg-background dark:bg-background pr-4 pl-11 md:text-sm"
                />
              </div>
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email" className="font-semibold">
                Email Address
              </FieldLabel>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 rounded-xl bg-background dark:bg-background pr-4 pl-11 md:text-sm"
                />
              </div>
            </Field>

            {/* Profile Photo URL */}
            <Field>
              <FieldLabel htmlFor="photoUrl" className="font-semibold">
                Profile Photo URL
              </FieldLabel>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="photoUrl"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="h-12 rounded-xl bg-background dark:bg-background pr-4 pl-11 md:text-sm"
                />
              </div>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Optional
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password" className="font-semibold">
                Password
              </FieldLabel>
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

              {/* Password rules — static list, checked later during validation */}
              <ul className="mt-1 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <X className="size-4 shrink-0" />
                  At least one uppercase letter (A-Z)
                </li>
                <li className="flex items-center gap-3">
                  <X className="size-4 shrink-0" />
                  At least one lowercase letter (a-z)
                </li>
                <li className="flex items-center gap-3">
                  <X className="size-4 shrink-0" />
                  Minimum 6 characters length
                </li>
              </ul>
            </Field>

            {/* Primary action */}
            <Button
              type="submit"
              className="h-14 w-full rounded-xl bg-linear-to-r from-emerald-400 to-emerald-500 text-base font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-600"
            >
              Register
              <ArrowRight className="size-5" />
            </Button>
          </FieldGroup>
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
          onClick={handleGoogleSignIn}
          type="button"
          variant="outline"
          className="h-12 w-full gap-3 rounded-xl text-base font-semibold dark:bg-transparent"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative Google mark, hidden from assistive tech */}
          {/* <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg> */}
          <FcGoogle /> 
          Continue with Google
        </Button>
        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-emerald-500 hover:text-emerald-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignUp;
