import Link from "next/link";
import waveMask from "@/assets/images/wavemask.svg";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <section className="relative">
      {/* Charity drive photo — only visible through the wave shapes (the SVG's
          dark background is ~0 luminance, so the left side stays background */}
      <img
        src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=1470&auto=format&fit=crop"
        alt="Volunteers at a community charity drive"
        className="absolute inset-0 size-full object-cover brightness-90"
        style={{
          WebkitMaskImage: `url(${waveMask.src})`,
          maskImage: `url(${waveMask.src})`,
          maskMode: "luminance",
          maskSize: "cover",
          maskPosition: "right center",
          maskRepeat: "no-repeat",
        }}
      />

      {/* Text — left side, above the image */}
      <div className="container relative z-10 flex min-h-125 flex-col justify-center space-y-5">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Ripple
        </h1>
        <p className="text-lg font-semibold italic">
          Small acts. Waves of change.
        </p>
        <p className="max-w-md text-muted-foreground md:text-lg">
          Organize community service events, join drives near you, and watch
          your kindness spread to the people who need it most.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/events">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200"
            >
              Explore Upcoming Events
            </Button>
          </Link>
          <Link href="/events/create">
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-xl px-6 text-base font-semibold"
            >
              Create Event
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
