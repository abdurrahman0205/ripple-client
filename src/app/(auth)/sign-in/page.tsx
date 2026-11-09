"use client";
import { ArrowRight, Eye, EyeOff, Leaf, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordLength = 6;

type SignInErrors = {
  email?: string;
  password?: string;
};

const SignIn = () => {
  const [errors, setErrors] = useState<SignInErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

  
    const nextErrors: SignInErrors = {};
    if (!emailRegex.test(userData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (userData.password.length < passwordLength) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    const { data, error } = await signIn.email({
      ...userData,
      callbackURL: "/",
    },
      {
        onSuccess: () => {
          toast.success('Sign in successfull!!')
      }
    });
    setIsSubmitting(false);

    if (error) {
      toast.error("Invalid email or password!!");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    toast.success("Sign in successfull!!");
  };

  return (
    <AuthShell>
      <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
        {/* Logo badge */}
        <div className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-ar-primary to-ar-accent text-ar-primary-foreground shadow-lg shadow-ar-primary/30">
          <Leaf className="size-7" />
        </div>

        {/* Heading */}
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Sign in to organize and join community drives
        </p>

        <form onSubmit={handleSignIn} noValidate className="mt-7 space-y-5">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="yourname@example.com"
                aria-invalid={!!errors.email}
                className="h-12 rounded-xl pr-4 pl-11 md:text-sm"
              />
            </div>
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          {/* Password */}
          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="#"
                className="text-sm font-semibold text-ar-primary hover:text-ar-primary-hover"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className="h-12 rounded-xl pr-12 pl-11 md:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>

          {/* Primary action */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-ar-primary text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            <ArrowRight className="size-5" />
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
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
          className="h-12 w-full gap-3 rounded-full text-base font-semibold dark:bg-transparent"
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
            className="font-semibold text-ar-primary hover:text-ar-primary-hover"
          >
            Register here
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignIn;
