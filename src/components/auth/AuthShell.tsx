import type React from "react";

// Auth pages split the viewport into two equal halves (grid, Tailwind only).
// Left  -> the auth card (passed in as children)
// Right -> placeholder image, clipped by a 45° diagonal so the photo fills the
// upper-right half of the panel (a `clip-path`, replaceable by an SVG mask later).
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
          className="absolute inset-0 size-full object-cover lg:[clip-path:polygon(0_0,100%_0,100%_100%)]"
        />
      </div>
    </section>
  );
};

export default AuthShell;
