import React from 'react';
import { use } from "react";
import { EventData } from "@/lib/type";
import EventCard from '@/components/card/EventCard';


const getEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL as string}/api/events`);

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

  const events = await getEvents();

  return (
    <section className=''>
      <div className='container mx-auto max-w-5xl'>

        <div>

          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-30">
            {events.map((event: EventData) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;