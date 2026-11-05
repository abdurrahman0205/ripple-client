import {
  Calendar,
  Heart,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EventDetailsPageProps } from "@/lib/type";
import JoinEvent from "@/components/joinevent";

const EventDetailsPage = async ({params}: EventDetailsPageProps) => {

  const { id } = await params;
  const getEvent = await fetch(`${process.env.BASE_API_URL}/api/events/${id}`)
  const event = await getEvent.json()

  console.log(event);
  
  const getUser = await fetch(`${process.env.BASE_API_URL}/api/users`)
  const users =await getUser.json()

  const user = users.find((user: { name: string, email: string, image: string }) => { user.email === event.organizer })


  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero */}
      <div className="relative h-[440px] overflow-hidden rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=1470&auto=format&fit=crop"
          alt="Event cover"
          className="absolute inset-0 size-full object-cover brightness-50"
        />
        {/* bottom fade so the title stays readable */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <Badge
          variant="secondary"
          className="absolute top-6 left-6 h-auto rounded-full bg-background/80 px-4 py-2 backdrop-blur"
        >
          <Heart className="text-emerald-400" data-icon="inline-start" />
          {event?.eventType}
        </Badge>

        <div className="absolute right-8 bottom-8 left-8 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {event?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/85">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-emerald-400" />
              {event?.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-emerald-400" />
              {event?.eventDate}
            </span>
          </div>
        </div>
      </div>

      {/* Join bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card/60 p-4 ring-1 ring-foreground/10 md:p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-950/60 ring-1 ring-emerald-500/20">
            <Users className="size-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-semibold">2 Volunteers Joined</p>
            <p className="text-sm text-muted-foreground">
              Sign up to join hands for this drive
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-12 rounded-xl dark:bg-input/10"
          >
            <Share2 className="size-5" />
          </Button>
          <JoinEvent event={event} />
        </div>
      </div>

      {/* Body: about + sidebar */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold">About this Social Initiative</h2>
          <p className="mt-4 text-muted-foreground">{event?.description}</p>

          <Separator className="my-6" />

          <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
            Volunteer Guidelines
          </h3>
          <ul className="mt-4 space-y-3">
            {event.guidelines.map((guideline: string[], i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-2 size-2 shrink-0 rounded-full bg-emerald-400" />
                {guideline}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-card/60 p-5 ring-1 ring-foreground/10">
            <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
              Initiative Organizer
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-lg font-medium">
                {}
              </div>
              <div>
                <p className="font-semibold">{user}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {event.organizer}
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 text-emerald-400" />
              Verified Platform Member
            </p>
          </div>

          <div className="rounded-2xl bg-card/60 p-5 ring-1 ring-foreground/10">
            <h3 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
              Confirmed Volunteers (2)
            </h3>
            <ul className="mt-4 space-y-3">
              {["abc", "jony"].map((name) => (
                <li key={name} className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium uppercase">
                    {name[0]}
                  </div>
                  <p className="text-sm">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
