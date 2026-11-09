import type React from "react";

// Auth pages split the viewport into two halves.
// Left  -> the auth card (passed in as children)
// Right -> photo with an S-curved edge carved out by an SVG overlay, plus soft
// brand-colored glows. Cover-only helper image used until real imagery exists.
const AUTH_IMAGE =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80";

const AuthShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative grid min-h-[calc(100svh-4rem)] grid-cols-1 lg:grid-cols-2">
      {/* Decorative brand glow & arcs behind the form side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-28 -left-28 size-[26rem] rounded-full border border-ar-primary/15" />
        <div className="absolute -top-44 -left-44 size-[34rem] rounded-full border border-ar-primary/10" />
        <div className="absolute -bottom-40 -left-20 size-[28rem] rounded-full border border-ar-primary/10" />
        <div className="absolute top-1/4 -right-10 size-64 rounded-full bg-ar-primary/10 blur-3xl" />
      </div>

      {/* Left — form side */}
      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right — curved photo panel */}
      <div className="relative hidden h-auto overflow-hidden lg:block">
        <img
          src={AUTH_IMAGE}
          alt="Community volunteers"
          className="absolute inset-0 size-full object-cover"
        />
        {/* S-curve carved through the middle of the panel's left edge */}
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative curve overlay, hidden from assistive tech */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute inset-0 size-full"
        >
          <path
            d="M0 0 H55 C68 12 70 28 58 42 C46 56 40 64 47 78 C53 90 60 94 62 100 H0 Z"
            fill="var(--background)"
          />
          <path
            d="M55 0 C68 12 70 28 58 42 C46 56 40 64 47 78 C53 90 60 94 62 100"
            fill="none"
            stroke="var(--ar-primary)"
            strokeWidth="0.6"
            opacity="0.8"
          />
        </svg>
        {/* Soft glow hugging the curve */}
        <div
          aria-hidden
          className="absolute top-1/3 left-[45%] size-40 -translate-x-1/2 rounded-full bg-ar-primary/20 blur-3xl"
        />
      </div>
    </section>
  );
};

export default AuthShell;
