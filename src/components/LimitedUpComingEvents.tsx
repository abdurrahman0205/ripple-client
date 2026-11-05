import { use } from "react";
import EventCard from "./card/EventCard";
import { EventData } from "@/lib/type";


const getEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL as string}/api/events/featured`);

    if (!res.ok) {
      console.warn(`Failed to fetch data.
      Status: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};


const LimitedUpComingEvents = async () => {
  const events = await getEvents();
  // console.log(data);
  // console.log(eventsPromise);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold my-4">Upcoming Events</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: EventData) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
   
  );
};

export default LimitedUpComingEvents;

