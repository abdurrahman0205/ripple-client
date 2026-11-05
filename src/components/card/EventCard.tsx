import React from 'react';
import { ArrowRight, Calendar, MapPin, Tag, User } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { EventData } from '@/lib/type';
import { cn } from '@/lib/utils';




// const events = [
//   {
//     id: "1",
//     title: "Sed commodo natus re",
//     location: "Eos possimus dolor",
//     description: "Facilis quae nobis e, tempora rerum unde modi.",
//     category: "Food Drive",
//     date: "Wed, Nov 4, 2026",
//     organizer: "Mohim",
//     image:
//       "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=1470&auto=format&fit=crop",
//   },
//   {
//     id: "2",
//     title: "Winter blanket drive",
//     location: "Pondok ranji, Dhaka",
//     description: "Handing out warm blankets to families before the cold wave.",
//     category: "Winter Relief",
//     date: "Tue, Nov 3, 2026",
//     organizer: "Karim",
//     image:
//       "https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=1470&auto=format&fit=crop",
//   },
//   {
//     id: "3",
//     title: "Neighborhood cleanup",
//     location: "Gulshan lake park",
//     description: "A morning cleanup session followed by a community lunch.",
//     category: "Cleanup",
//     date: "Sat, Nov 14, 2026",
//     organizer: "Afsana",
//     image:
//       "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1470&q=80",
//   },
// ];





const EventCard = ({
  event, pastevent
}: {
  event: EventData,
  pastevent?: boolean
}) => {
  return (
    <Card className="pt-0">
      {/* Cover with category badge + date pill */}
      <div className="relative">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="aspect-16/10 w-full object-cover"
        />
        <Badge
          variant="outline"
          className="absolute top-4 left-4 h-auto rounded-full border-emerald-500/30 bg-background/60 px-4 py-1.5 text-sm font-semibold text-emerald-400 backdrop-blur"
        >
          <Tag data-icon="inline-start" />
          {event.eventType}
        </Badge>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-background/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
          <Calendar className="size-4 text-emerald-400" />
          {event.eventDate}
        </div>
      </div>

      <CardContent className="space-y-3">
        <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
        <p className="flex items-center gap-2 font-medium text-muted-foreground">
          <MapPin className="size-4 text-emerald-400" />
          {event.location}
        </p>
        <p className="text-muted-foreground">{event.description}</p>

        <Separator className="my-2" />

        <p className="flex items-center gap-2 text-muted-foreground">
          <User className="size-4 text-emerald-400" />
          {event.organizer}
        </p>
      </CardContent>

      <CardFooter className="border-t-0 bg-transparent">
        <Link href={`/events/${event._id}`} className="w-full">
          <Button className={cn("h-12 w-full rounded-xl bg-emerald-300 text-base font-semibold text-emerald-950 hover:bg-emerald-200",)}>
            View Event
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;