// biome-ignore-all lint/a11y/useValidAnchor: placeholder href="#" links until routing is added
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
  return (
    <AuthShell>
      <div className="rounded-3xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-10">
        {/* Logo badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
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
        <form className="mt-8">
          <FieldGroup className="gap-6">
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName" className="font-semibold">
                Full Name
              </FieldLabel>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Tanvir Ahmed"
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
                  name="photoUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="h-12 rounded-xl bg-background dark:bg-background pr-4 pl-11 md:text-sm"
                />
              </div>
              <FieldDescription className="text-muted-foreground">
                Optional: Leave empty for default avatar
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
              type="button"
              className="h-14 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-base font-bold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-600"
            >
              Register
              <ArrowRight className="size-5" />
            </Button>
          </FieldGroup>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-emerald-500 hover:text-emerald-600"
          >
            Login here
          </a>
        </p>
      </div>
    </AuthShell>
  );
};

export default SignUp;
