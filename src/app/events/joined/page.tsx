import { ArrowRight, CheckCircle2, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const JoinedEventsPage = () => {
  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8">
      {/* Header */}
      <div>
        <Badge className="h-auto rounded-full bg-emerald-500/10 px-4 py-1.5 text-emerald-300 ring-1 ring-emerald-500/20">
          <CheckCircle2 data-icon="inline-start" />
          My Volunteer Commitments
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Joined Events
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Here are all the social development and community service drives you
          have signed up for, sorted by event date.
        </p>
      </div>

      <Separator className="my-8" />

      {/* Empty state */}
      <div className="flex flex-col items-center rounded-3xl bg-card/50 px-8 py-20 text-center ring-1 ring-foreground/10">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
          <HeartHandshake className="size-8 text-emerald-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold md:text-3xl">
          You Haven't Joined Any Events Yet
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Discover active community cleanups, blanket distributions, and winter
          relief drives in your area and join hands!
        </p>
        <Link href="/events" className="mt-8">
          <Button className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200">
            Explore Upcoming Events
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JoinedEventsPage;
