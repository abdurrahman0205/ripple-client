import { CirclePlus, Settings, Wand2 } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/card/EventCard";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import type { EventData } from "@/lib/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const ManageEventsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })


  const res = await fetch(`${process.env.BASE_API_URL as string}/api/events/manage/${session?.user?.email}`)
  
  const eventsResponse = await res.json()
  
  const events = Array.isArray(eventsResponse)
    ? eventsResponse
    : [];

  return (
    <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10">
      <PageHeader
        badge={
          events.length > 0
            ? `Managing ${events.length} ${events.length === 1 ? "event" : "events"}`
            : "Organizer Dashboard"
        }
        icon={Settings}
        title="Manage My Events"
        description="View, edit, and manage the social drives you have published. Only
        you have permission to edit or delete your created initiatives."
      >
        <Link href="/events/create">
          <Button className="h-12 rounded-xl bg-ar-primary px-6 text-base font-semibold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover">
            <CirclePlus data-icon="inline-start" />
            Create New Event
          </Button>
        </Link>
      </PageHeader>

      {/* Event cards with manage actions (Edit / Delete / View Details) */}
      <div className="grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: EventData) => (
          <EventCard key={event._id} event={event} variant="manage" />
        ))}
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl bg-ar-card/60 px-8 py-20 text-center ring-1 ring-ar-card-border">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-ar-primary/10 ring-1 ring-ar-primary/25">
            <Wand2 className="size-8 text-ar-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold md:text-3xl">
            You Haven't Created Any Events Yet
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Take the initiative! Create a winter clothes drive, blanket
            distribution, or cleanup campaign in your neighborhood.
          </p>
          <Link href="/events/create" className="mt-8">
            <Button className="h-12 rounded-xl bg-ar-primary px-6 text-base font-semibold text-ar-primary-foreground hover:bg-ar-primary-hover">
              <CirclePlus data-icon="inline-start" />
              Create an Event
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManageEventsPage;
