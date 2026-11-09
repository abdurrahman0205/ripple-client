import { CalendarCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Newsetter from "@/assets/images/newsletter.svg";
import Image from "next/image";

// Colors use the site's brand tokens (ar-primary / ar-card / muted-foreground …)
// so the newsletter section matches the green "ripple" palette in both themes.
const NewsLetter = () => {
  return (
    <section className="w-full px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between overflow-hidden rounded-[2.5rem] bg-ar-card shadow-xl ring-1 ring-ar-card-border md:flex-row">

        {/* Content */}
        <div className="flex flex-col px-6 py-10 sm:px-10 md:w-3/5 md:px-12 md:py-14 lg:px-16">
          <span className="flex w-fit items-center gap-2 rounded-full bg-ar-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-ar-primary uppercase ring-1 ring-ar-primary/25">
            <Mail className="size-4" />
            Newsletter
          </span>

          <h2 className="mt-4 font-heading text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl">
            Get every new drive{" "}
            <span className="text-ar-primary">delivered to you</span>
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Subscribe and never miss an upcoming community event — gentle
            reminders for food drives, cleanups, and more. No spam, just waves
            of good work.
          </p>

          <form className="mt-8 w-full max-w-md space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              className="h-12 rounded-full px-6 md:text-base"
            />
            <Input
              type="email"
              placeholder="E-mail"
              className="h-12 rounded-full border-0 px-6 shadow-lg shadow-ar-primary/10 ring-1 ring-ar-primary/25 md:text-base"
            />
            <Button
              type="button"
              className="h-12 rounded-full bg-ar-primary px-10 text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
            >
              <CalendarCheck data-icon="inline-start" />
              Subscribe
            </Button>
          </form>
        </div>

        {/* Decorative panel */}
        <div className="flex flex-1 items-center justify-center bg-ar-surface py-8 md:py-10">
          <Image
            src={Newsetter}
            width={280}
            height={280}
            alt="Newsletter illustration"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
