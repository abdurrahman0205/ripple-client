import { Tag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import EventCard from "./card/EventCard";
import { EventData } from "@/lib/type";

const Gallery = async () => {

  const res = await fetch(`${process.env.BASE_API_URL}/api/events/past-events`)
  const pastEvent = await res.json()
  const events = pastEvent;

  // const item = (
  //   <Card className="relative mx-auto w-full pt-0">
  //     <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
  //     <img
  //       src="https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
  //       alt="Event cover"
  //       className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
  //     />
  //     <CardHeader>
  //       <CardAction>
  //         <Badge variant="secondary">
  //           <Tag />
  //           Featured
  //         </Badge>
  //       </CardAction>
  //       <CardTitle>Design systems meetup</CardTitle>
  //       <CardDescription>
  //         A practical talk on component APIs, accessibility, and shipping
  //         faster.
  //       </CardDescription>
  //     </CardHeader>
  //     <CardFooter>
  //       <Button className="w-full">View Event</Button>
  //     </CardFooter>
  //   </Card>
  // );

  return (
    // px-14 keeps the offscreen nav buttons (-left-12 / -right-12) inside the
    // view so they can never stretch the page horizontally.
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <div className="px-14">
        <h1 className="text-2xl font-bold py-4">Our Completed Events</h1>
        <Carousel>
          <CarouselContent>
            {events.map((event: EventData) =>(<CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
              <EventCard event={event} />
            </CarouselItem>))}
            
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
