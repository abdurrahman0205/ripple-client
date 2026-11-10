import {
  Calendar,
  Heart,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import JoinEvent from "@/components/joinevent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import type { EventData, EventDetailsPageProps } from "@/lib/type";

/* Fallback cover while events don't have their own thumbnail */
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80";

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { id } = await params;
  

  let userData = []

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  let token;
  if (session?.user) {
    const data = await auth.api.getToken({
      headers: await headers(),
    });
   token = data.token;
  }


  const getUser = await fetch(`${process.env.BASE_API_URL}/api/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  userData = await getUser.json();
  const users = Array.isArray(userData)? userData : []

  const getEvent = await fetch(`${process.env.BASE_API_URL}/api/events/${id}`);
  const event = await getEvent.json();

  const getCount = await fetch(`${process.env.BASE_API_URL}/api/events/count/${id}`);
  const count = await getCount.json();
  console.log('joined event id', count);


  const user = users.find(
    (user: { name: string; email: string; image: string }) => {
      return user.email === event.organizer;
    },
  );

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8">
      
      <div className="relative min-h-105 overflow-hidden rounded-3xl ring-1 ring-ar-card-border">
        <img
          src={event?.thumbnail || PLACEHOLDER_IMAGE}
          alt={event?.title || "Event cover"}
          className="absolute inset-0 size-full object-cover"
        />
        {/* gradient scrim: readable bottom-left, photo stays clear top-right */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/45 to-background/5" />

        <Badge
          variant="outline"
          className="absolute top-6 left-6 h-auto rounded-full border-transparent bg-background/70 px-4 py-2 text-sm font-semibold backdrop-blur"
        >
          <Heart className="text-ar-primary!" data-icon="inline-start" />
          {event?.eventType}
        </Badge>

        <div className="absolute right-8 bottom-8 left-8 space-y-3 max-w-2xl">
          <h1 className="text-4xl leading-tight font-bold tracking-tight text-foreground drop-shadow-sm md:text-5xl">
            {event?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-foreground/90">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-ar-primary" />
              {event?.location}
            </span>
            <span aria-hidden className="h-4 w-px bg-border" />
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-ar-primary" />
              {event?.eventDate}
            </span>
          </div>
        </div>
      </div>

      {/* Join bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-card/70 p-4 ring-1 ring-ar-card-border md:p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-ar-primary/10 ring-1 ring-ar-primary/25">
            <Users className="size-6 text-ar-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold">Volunteer: {(1 + count?.length)}</p>
            
            {!session?.user && (
              <p className="text-sm text-muted-foreground">
                Sign up or sign in to join hands for this drive
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-12 rounded-xl dark:bg-input/10"
            title="Share this event"
          >
            <Share2 className="size-5" />
          </Button>
          <JoinEvent event={event} />
        </div>
      </div>

      {/* Body: about + organizer sidebar */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold">About this Social Initiative</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {event?.description}
          </p>

          <Separator className="my-6" />

          <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
            Volunteer Guidelines
          </h3>
          <ul className="mt-4 space-y-3">
            {(event?.guidelines ?? []).map((guideline: string, i: number) => (
              <li
                key={guideline}
                className="flex items-start gap-3 rounded-xl bg-card/50 p-3 ring-1 ring-foreground/5"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-ar-primary" />
                <span className="text-muted-foreground">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar — organizer only */}
        <div className="rounded-3xl bg-card/70 p-6 ring-1 ring-ar-card-border">
          <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
            Initiative Organizer
          </h3>
          <div className="mt-5 flex items-center gap-3">
            <Avatar size="lg" className="size-12">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user?.name} />
              ) : null}
              <AvatarFallback>{user?.name?.slice(0, 1) || "?"}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold">{user?.name || "Organizer"}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="size-3.5" />
                {event?.organizer}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="flex items-center gap-2 text-sm">
            <ShieldCheck className="size-4 text-ar-primary" />
            Verified Platform Member
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
