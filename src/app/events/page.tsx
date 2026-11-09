import { CalendarRange, CirclePlus, Compass } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/card/EventCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import type { EventData } from "@/lib/type";

const getEvents = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL as string}/api/events`,
    );

    if (!res.ok) {
      console.warn(`Failed to fetch event types.
      Status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const UpcomingEvents = async () => {
  const eventsResponse = await getEvents();
  // Guard against the API returning an error object instead of an array
  const events: EventData[] = Array.isArray(eventsResponse)
    ? eventsResponse
    : [];

  return (
    <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10">
      <PageHeader
        badge={
          events.length > 0
            ? `${events.length} drives coming up`
            : "Community Events"
        }
        icon={CalendarRange}
        title="Upcoming Events"
        description="Discover the community cleanups, donation drives, and awareness
        campaigns happening around you — pick one and be part of the ripple."
      >
        <Link href="/events/create">
          <Button className="h-12 rounded-xl bg-ar-primary px-6 text-base font-semibold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover">
            <CirclePlus data-icon="inline-start" />
            Create New Event
          </Button>
        </Link>
      </PageHeader>

      {/* Event cards */}
      <div className="grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: EventData) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl bg-ar-card/60 px-8 py-20 text-center ring-1 ring-ar-card-border">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-ar-primary/10 ring-1 ring-ar-primary/25">
            <Compass className="size-8 text-ar-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold md:text-3xl">
            No Upcoming Events Right Now
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Nothing on the calendar yet. Be the spark — create a cleanup
            campaign, food drive, or awareness event in your community!
          </p>
          <Link href="/events/create" className="mt-8">
            <Button className="h-12 rounded-xl bg-ar-primary px-6 text-base font-semibold text-ar-primary-foreground hover:bg-ar-primary-hover">
              Create the First Event
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
