import { ArrowRight, CheckCircle2, HeartHandshake } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/card/EventCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import type { EventData } from "@/lib/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const JoinedEventsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  const getToken = await auth.api.getToken({
    headers: await headers()
  })
  const token = getToken.token

  const firstRes = await fetch(
    `${process.env.BASE_API_URL}/api/events/manage/${session?.user?.email}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );

  const secondRes = await fetch(
    `${process.env.BASE_API_URL}/api/events/joined/${session?.user?.email}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  );


  const OMeventsResponse = await firstRes.json();
  const joinedEventsResponse = await secondRes.json();
  const dataFromDB = [...OMeventsResponse, ...joinedEventsResponse]
  


  const events: EventData[] = Array.isArray(dataFromDB)
    ? dataFromDB
    : [];

  return (
    <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10">
      <PageHeader
        badge={
          events.length > 0
            ? `You're in ${events.length} ${events.length === 1 ? "event" : "events"}`
            : "My Volunteer Commitments"
        }
        icon={CheckCircle2}
        title="Joined Events"
        description="Here are all the social development and community service drives you
        have signed up for. Show up, participate, and make it count!"
      />

      {/* Joined event cards — the view button is replaced by "Leave" */}
      <div className="grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: EventData) => (
          <EventCard key={event._id} event={event} variant="joined" />
        ))}
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl bg-ar-card/60 px-8 py-20 text-center ring-1 ring-ar-card-border">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-ar-primary/10 ring-1 ring-ar-primary/25">
            <HeartHandshake className="size-8 text-ar-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold md:text-3xl">
            You Haven't Joined Any Events Yet
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Discover active community cleanups, blanket distributions, and
            winter relief drives in your area and join hands!
          </p>
          <Link href="/events" className="mt-8">
            <Button className="h-12 rounded-xl bg-ar-primary px-6 text-base font-semibold text-ar-primary-foreground hover:bg-ar-primary-hover">
              Explore Upcoming Events
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JoinedEventsPage;
