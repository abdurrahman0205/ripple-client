import { Tag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { EventData } from "@/lib/type";
import EventCard from "./card/EventCard";

const Gallery = async () => {
  const res = await fetch(`${process.env.BASE_API_URL}/api/events/past-events`);
  const pastEvent = await res.json();
  // Guard against the API returning an error object instead of an array
  const events: EventData[] = Array.isArray(pastEvent) ? pastEvent : [];

  return (
    // px-14 keeps the offscreen nav buttons (-left-12 / -right-12) inside the
    // view so they can never stretch the page horizontally.
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <div className="px-2 sm:px-14">
        <h1 className="text-2xl font-bold py-4">Our Completed Events</h1>
        <Carousel>
          <CarouselContent className="py-1">
            {events.map((event: EventData) => (
              <CarouselItem
                key={event._id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <EventCard event={event} variant="gallery" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
