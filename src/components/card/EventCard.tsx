import {
  ArrowRight,
  Calendar,
  Leaf,
  LogOut,
  MapPin,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import type { EventData } from "@/lib/type";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DeleteEvent } from "../deleteEvent";

/* Placeholder until real event covers are uploaded everywhere. */
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80";

/** "2026-11-16" -> "16 Nov 2026". Falls back to the raw value when unparsable. */
const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* Date + location meta row shared by the vertical card layouts */
const EventMeta = ({ event }: { event: EventData }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
    <span className="flex items-center gap-2">
      <Calendar className="size-4 shrink-0 text-ar-accent" />
      {formatDate(event.eventDate)}
    </span>
    <span aria-hidden className="h-4 w-px bg-border" />
    <span className="flex items-center gap-2">
      <MapPin className="size-4 shrink-0 text-ar-accent" />
      <span className="font-medium text-foreground">{event.location}</span>
    </span>
  </div>
);

/* Category pill with leaf icon */
const EventCategoryBadge = ({ label }: { label: string }) => (
  <Badge
    variant="outline"
    className="h-auto w-fit rounded-full border-transparent bg-ar-primary/10 px-3 py-1.5 text-sm font-semibold text-ar-primary ring-1 ring-ar-primary/25"
  >
    <Leaf data-icon="inline-start" className="size-4!" />
    {label}
  </Badge>
);

type EventCardProps = {
  event: EventData;
  /**
   * default — vertical card with organizer row + "View Event" (home, events list)
   * manage  — same body, but the footer becomes Edit / Delete / View Details
   * joined  — same body, but "View Event" becomes a "Leave" button
   * gallery — horizontal overlay card for the past-events carousel
   */
  variant?: "default" | "manage" | "joined" | "gallery";
};

const EventCard = ({ event, variant = "default" }: EventCardProps) => {
  const cover = event.thumbnail || PLACEHOLDER_IMAGE;
  const href = `/events/${event._id}`;

  /* ---------------------------------------------------------------------- */
  /* Gallery variant — horizontal card, image bleeds under the content      */
  /* ---------------------------------------------------------------------- */
  if (variant === "gallery") {
    return (
      <article className="relative flex min-h-56 flex-col justify-center overflow-hidden rounded-3xl bg-ar-card ring-1 ring-ar-card-border">
        {/* Cover takes the whole card box; content sits on a gradient scrim */}
        <img
          src={cover}
          alt={event.title}
          className="absolute inset-0 z-0 size-full object-cover object-[72%_center]"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-linear-to-r from-ar-card via-ar-card/95 to-ar-card/20"
        />

        <div className="relative z-20 flex max-w-[88%] flex-col gap-3 p-5 sm:max-w-[80%] sm:p-6">
          <EventCategoryBadge label={event.eventType} />

          <h3 className="font-heading text-xl leading-snug font-bold sm:text-2xl">
            {event.title}
          </h3>

          <div className="flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-ar-primary/15 px-4 py-2 text-xs font-medium ring-1 ring-ar-primary/25 sm:text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-ar-primary" />
              {event.eventDate}
            </span>
            <span aria-hidden className="h-4 w-px bg-ar-primary/30" />
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-ar-primary" />
              {event.location}
            </span>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-4 shrink-0 text-ar-primary" />
            {event.organizer}
          </p>
        </div>
      </article>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Default & manage variants — vertical card with full-bleed cover        */
  /* ---------------------------------------------------------------------- */
  return (
    <article className="group/card flex flex-col overflow-hidden rounded-3xl bg-ar-card text-card-foreground ring-1 ring-ar-card-border transition-shadow duration-300 hover:shadow-lg hover:shadow-ar-primary/10">
      {/* Cover occupies the entire upper side of the card */}
      <div className="relative">
        <img
          src={cover}
          alt={event.title}
          className="aspect-16/10 w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <EventCategoryBadge label={event.eventType} />
        <EventMeta event={event} />
        <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-muted-foreground">
          {event.description}
        </p>

        <Separator className="mt-2" />

        {variant === "manage" ? (
          /* Manage actions: Edit + Delete on the left, wider View Details right */
          <div className="grid grid-cols-[1fr_1.15fr_1.4fr] gap-2.5 pt-1">
            <Button
              variant="outline"
              className="h-11 rounded-xl text-sm font-semibold"
              title="Edit event"
            >
              <Pencil data-icon="inline-start" />
              Edit
            </Button>
            
            <DeleteEvent id={event._id} />
            
            <Link href={href} className="w-full">
              <Button className="h-11 w-full rounded-xl bg-ar-primary text-base font-bold text-ar-primary-foreground hover:bg-ar-primary-hover">
                View Details
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Organizer row + View Event */
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ar-primary/10 text-ar-primary ring-1 ring-ar-primary/20">
                <User className="size-5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-xs text-muted-foreground">
                  Organized by
                </span>
                <span className="block truncate text-base font-semibold">
                    {event.organizerName}
                </span>
              </span>
            </div>
            {variant === "joined" ? (
              /* Joined card: the view button is replaced by Leave */
              <Button
                variant="destructive"
                className="h-11 rounded-xl px-5 text-base font-bold"
                title="Leave this event"
              >
                <LogOut data-icon="inline-start" />
                Leave
              </Button>
            ) : (
              <Link href={href}>
                <Button className="h-11 rounded-xl bg-ar-primary px-5 text-base font-bold text-ar-primary-foreground hover:bg-ar-primary-hover">
                  View Event
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default EventCard;
