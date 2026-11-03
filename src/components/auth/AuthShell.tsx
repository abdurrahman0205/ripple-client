import type React from "react";

// Auth pages split the viewport into two equal halves (grid, Tailwind only).
// Left  -> the auth card (passed in as children)
// Right -> placeholder image, cut by a 45° angled divider
// Layout/styling only: no state, no handlers, no links.
//
// The divider is a huge square rotated -45° and filled with the page
// background. Its leading edge sits exactly on the 45° line that runs from
// the top-left corner of the image panel down to the right, so the photo is
// only visible on the upper-right side of that line.
const AuthShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid min-h-[calc(100svh-4rem)] grid-cols-1 lg:grid-cols-2">
      {/* Left — form side */}
      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-xl">{children}</div>
      </div>

      {/* Right — masked placeholder image */}
      <div className="relative h-40 overflow-hidden bg-muted lg:h-auto">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80"
          alt="Community volunteers"
          className="absolute inset-0 size-full object-cover"
        />

        {/* 45° divider wedge — hidden on mobile, where the panel is a band */}
        <div className="absolute top-[-29.29vmax] left-[-170.71vmax] hidden size-[200vmax] -rotate-45 bg-background lg:block" />
      </div>
    </section>
  );
};

export default AuthShell;
