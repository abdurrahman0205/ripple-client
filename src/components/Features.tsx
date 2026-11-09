import {
  ArrowRight,
  CalendarDays,
  Leaf,
  type LucideIcon,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: CalendarDays,
    title: "Create & Manage Events",
    description:
      "Organize cleanups, drives, and awareness campaigns with ease.",
  },
  {
    icon: Users,
    title: "Build a Community",
    description: "Bring people, students and volunteers together for greater impact.",
  },
  {
    icon: TrendingUp,
    title: "Track Your Impact",
    description:
      "Discover how your little initiatives contribute to a greater impact on life.",
  },
  {
    icon: Zap,
    title: "Simple & Intuitive",
    description:
      "A user-friendly platform that makes getting involved effortless.",
  },
];

const Features = () => {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      {/* Decorative brand glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-10 left-0 size-72 rounded-full bg-ar-primary/15 blur-3xl" />
        <div className="absolute top-24 right-0 size-72 rounded-full bg-ar-accent/10 blur-3xl" />
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <Badge
          variant="outline"
          className="h-auto rounded-full border-transparent bg-ar-primary/10 px-4 py-1.5 text-sm font-semibold text-ar-primary ring-1 ring-ar-primary/25"
        >
          <Leaf data-icon="inline-start" className="size-4!" />
          Powerful Features
        </Badge>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Built for a Cleaner, <span className="text-ar-primary">Greener</span>{" "}
          & Greater Impact

          {/* Discover how your little initiatives contribute to a greater impact on socity and life of many people. */}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From organizing events to tracking impact, Ripple helps your community
          manage events and work together for a sustainable future.
        </p>
      </div>

      {/* Feature cards with a connector line running through the icons */}
      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute top-7 right-6 left-6 hidden h-px bg-linear-to-r from-transparent via-ar-primary/50 to-transparent lg:block"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-ar-primary bg-background text-ar-primary shadow-[0_0_18px_-2px_var(--ar-primary)] transition-transform duration-300 hover:scale-105">
                <feature.icon className="size-6" />
              </span>
              <div className="mt-6 flex-1 rounded-2xl bg-card/70 p-6 ring-1 ring-foreground/10">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex justify-center">
        <Link href="/events">
          <Button
            size="lg"
            className="h-12 rounded-full bg-ar-primary px-8 text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
          >
            Explore All Features
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Features;
