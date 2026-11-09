import { ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "@/assets/images/banner.png";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <section className="container mx-auto px-5 pt-10">
      <div className="relative min-h-[26rem] overflow-hidden rounded-3xl bg-linear-to-br from-ar-primary/40 via-ar-primary/20 to-ar-card ring-1 ring-ar-card-border">
        {/* Illustration as the card background */}
        <Image
          src={BannerImage}
          alt="Volunteers at a community charity drive"
          className="absolute inset-0 z-0 size-full object-cover object-[68%_center] dark:mix-blend-multiply"
          priority
        />

        {/* Wavy card-colored scrim sweeping over the left side so the text
            stays readable — angled edge, not a straight fade */}
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative scrim shape, hidden from assistive tech */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute inset-0 z-10 size-full"
        >
          <defs>
            <linearGradient id="banner-scrim" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor="var(--card)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--card)" stopOpacity="0.98" />
              <stop offset="80%" stopColor="var(--card)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--card)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 H48 C60 10 68 20 64 32 C60 44 48 52 52 64 C56 76 68 82 66 100 H0 Z"
            fill="url(#banner-scrim)"
          />
        </svg>

        {/* Glow riding the wave edge */}
        <div
          aria-hidden
          className="absolute top-1/4 left-[54%] z-10 size-56 -translate-x-1/2 rounded-full bg-ar-primary/25 blur-3xl"
        />

        {/* Text — sits on top of the image + scrim */}
        <div className="relative z-20 flex min-h-[26rem] max-w-xl flex-col justify-center gap-5 p-8 sm:p-12 lg:p-14">
          {/* Brand row */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-ar-primary/15 text-ar-primary ring-1 ring-ar-primary/30">
              <Leaf className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-ar-primary">
              Ripple
            </h1>
          </div>

          <p className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
            Small acts.{" "}
            <span className="text-ar-primary italic">Waves of change.</span>
          </p>

          <p className="max-w-md text-muted-foreground md:text-lg">
            Organize community service events, join drives near you, and watch
            your kindness spread to the people who need it most.
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/events">
              <Button
                size="lg"
                className="h-12 rounded-full bg-ar-primary px-6 text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
              >
                Explore Upcoming Events
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
            <Link href="/events/create">
              <Button
                size="lg"
                className="h-12 rounded-full border-border/60 bg-foreground/80 px-6 text-base font-semibold text-background hover:bg-foreground"
              >
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
