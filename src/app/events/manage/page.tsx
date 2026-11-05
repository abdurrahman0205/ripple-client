import { CirclePlus, Eye, Pencil, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EventCard from "@/components/card/EventCard";
import { EventData } from "@/lib/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getManageEvents = async () => {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL as string}/api/events/manage`)

    if (!res.ok) {
      console.warn(`Failed to fetch data.
      Status: ${res.status}`);
      return []
    }
    return await res.json()
  } catch (error) {
    console.warn('Error:', error)
    return []
  }
}

const ManageEventsPage = async () => {


  const events = await getManageEvents()

  const token = await auth.api.getToken({
    headers: await headers()
  })

  console.log(token);


  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Badge className="h-auto rounded-full bg-indigo-500/10 px-4 py-1.5 text-indigo-300 ring-1 ring-indigo-500/20">
            <Settings data-icon="inline-start" />
            Organizer Dashboard
          </Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Manage My Events
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            View, edit, and manage the social drives you have published. Only
            you have permission to edit or delete your created initiatives.
          </p>
        </div>
        <Link href="/events/create">
          <Button className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200">
            <CirclePlus data-icon="inline-start" />
            Create New Event
          </Button>
        </Link>
      </div>

      <Separator className="my-8" />

      {/* Event cards with manage actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: EventData) => (
          <EventCard
            key={event._id}
            event={event}
          // actions={
          //   <div className="grid w-full grid-cols-3 gap-2">
          //     <Button
          //       variant="outline"
          //       className="h-10 rounded-xl"
          //       title="Edit event"
          //     >
          //       <Pencil data-icon="inline-start" />
          //       Edit
          //     </Button>
          //     <Link href={`/events/${event.id}`} className="w-full">
          //       <Button className="h-10 w-full rounded-xl">
          //         <Eye data-icon="inline-start" />
          //         View
          //       </Button>
          //     </Link>
          //     <Button
          //       variant="destructive"
          //       className="h-10 rounded-xl"
          //       title="Delete event"
          //     >
          //       <Trash2 data-icon="inline-start" />
          //       Delete
          //     </Button>
          //   </div>
          // }
          />
        ))}
      </div>

      {/* Empty state (shown when you have no created events) */}
      {events.length === 0 && (
        <div className="flex flex-col items-center rounded-3xl bg-card/50 px-8 py-20 text-center ring-1 ring-foreground/10">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
            <Settings className="size-8 text-indigo-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold md:text-3xl">
            You Haven't Created Any Events Yet
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Take the initiative! Create a winter clothes drive, blanket
            distribution, or cleanup campaign in your neighborhood.
          </p>
          <Link href="/events/create" className="mt-8">
            <Button className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200">
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