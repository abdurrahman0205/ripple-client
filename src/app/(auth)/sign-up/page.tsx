"use client";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Leaf,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

type SignUpErrors = {
  email?: string;
  password?: string;
};

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live password rule checks (display only — enforced again on submit)
  const passwordRules = [
    {
      label: "At least one uppercase letter (A-Z)",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      passed: /[a-z]/.test(password),
    },
    {
      label: `Minimum ${MIN_PASSWORD_LENGTH} characters length`,
      passed: password.length >= MIN_PASSWORD_LENGTH,
    },
  ];

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    toast.success("Sign in successfull!!");
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    // Validation — email format + password rules only
    const nextErrors: SignUpErrors = {};
    if (!EMAIL_REGEX.test(userData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (
      userData.password.length < MIN_PASSWORD_LENGTH ||
      !/[A-Z]/.test(userData.password) ||
      !/[a-z]/.test(userData.password)
    ) {
      nextErrors.password =
        "Password needs an uppercase letter, a lowercase letter, and at least 6 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const { data, error } = await signUp.email({
      ...userData,
    });
    setIsSubmitting(false);

    if (data?.user) {
      toast.success("Account created successfully.");
    } else {
      toast.error("Something went wrong!!");
    }
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
          Join the ripple
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Create an account and make a difference
        </p>

        <form onSubmit={handleSignUp} noValidate className="mt-7">
          <FieldGroup className="gap-5">
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className="h-12 rounded-xl pr-4 pl-11 md:text-sm"
                />
              </div>
            </Field>

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

            {/* Profile Photo URL */}
            <Field>
              <FieldLabel htmlFor="photoUrl">Profile Photo URL</FieldLabel>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="photoUrl"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="h-12 rounded-xl pr-4 pl-11 md:text-sm"
                />
              </div>
              <FieldDescription className="text-muted-foreground text-[10px]">
                Optional
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
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

              {/* Live password rules */}
              <ul className="mt-1 space-y-1.5 text-sm">
                {passwordRules.map((rule) => (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 transition-colors ${
                      rule.passed ? "text-ar-primary" : "text-muted-foreground"
                    }`}
                  >
                    {rule.passed ? (
                      <Check className="size-4 shrink-0" />
                    ) : (
                      <X className="size-4 shrink-0" />
                    )}
                    {rule.label}
                  </li>
                ))}
              </ul>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            {/* Primary action */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-ar-primary text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
              <ArrowRight className="size-5" />
            </Button>
          </FieldGroup>
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
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-ar-primary hover:text-ar-primary-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignUp;
