"use client";
import { CalendarDays, Eye, MapPin, User } from "lucide-react";
import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectEventType from "@/components/SelectEventType";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient, useSession } from "@/lib/auth-client";

/* Placeholder shown in the preview card until a thumbnail URL is provided */
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80";

const defaultGuidelines = [
  "Wash your hands and wear gloves and a mask while packing food.",
  "Arrive 15 minutes early and stay at your assigned packing station.",
  "Do not eat or taste the food that is being packed.",
  "Distribute meals calmly and keep recipients in an orderly line.",
];

/* Numbered section header inside the form card (1, 2, 3) */
const FormSection = ({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-ar-primary text-sm font-bold text-ar-primary-foreground">
        {step}
      </span>
      <h2 className="text-lg font-bold">{title}</h2>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
    {children}
  </section>
);

export default function UpComingEvents() {
  const { data: session } = useSession();
  const [today, setToday] = useState("");

  // Live values for the preview card (submission flow is unchanged)
  const [preview, setPreview] = useState({
    title: "",
    eventType: "",
    eventDate: "",
    location: "",
    thumbnail: "",
  });

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const eventData = Object.fromEntries(formData.entries());
    console.log('before submit', eventData);
    
    const guidelinesInput = String(
      formData.get("volunteerGuidelines") ?? "",
    ).trim();

    const guidelines = guidelinesInput
      ? guidelinesInput.split("\n").filter(Boolean)
      : defaultGuidelines;

    const addData = {
      ...eventData,
      organizer: session?.user?.email,
      organizerName: session?.user?.name,

      guidelines,
    };
    const { data, error } = await authClient.token();
    const token = data?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/create-events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addData),
      },
    );

    const submitted = await res.json();

    if (submitted?.acknowledged) {
      toast.success("Successfully created the event");
    } else {
      toast.error("Event creation failed!!");
    }

    console.log(submitted, "after submit");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ar-card text-ar-primary shadow-lg shadow-ar-primary/20 ring-1 ring-ar-card-border">
          <CalendarDays className="size-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create a community event
          </h1>
          <p className="mt-1 text-muted-foreground">
            Bring people together. Make a positive impact.
          </p>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Form card — three numbered sections */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="w-full space-y-8 rounded-3xl bg-card/70 p-6 ring-1 ring-foreground/10 sm:p-8"
        >
          {/* 1 — Event details */}
          <FormSection step={1} title="Event details">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="form-title">
                  Event Title <span className="text-ar-primary">*</span>
                </FieldLabel>
                <Input
                  id="form-title"
                  name="title"
                  type="text"
                  placeholder="Eg: Tree Plantation Drive"
                  required
                  onChange={(e) =>
                    setPreview((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="form-type">
                    Event Type <span className="text-ar-primary">*</span>
                  </FieldLabel>
                  <Select
                    name="eventType"
                    onValueChange={(value) =>
                      setPreview((p) => ({ ...p, eventType: String(value) }))
                    }
                  >
                    <Suspense
                      fallback={
                        <span className="text-muted-foreground">Loading…</span>
                      }
                    >
                      <SelectEventType />
                    </Suspense>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="form-date">
                    Date <span className="text-ar-primary">*</span>
                  </FieldLabel>
                  <Input
                    id="form-date"
                    name="eventDate"
                    type="date"
                    min={today}
                    onChange={(e) =>
                      setPreview((p) => ({ ...p, eventDate: e.target.value }))
                    }
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="form-location">
                    Location <span className="text-ar-primary">*</span>
                  </FieldLabel>
                  <Input
                    id="form-location"
                    name="location"
                    type="text"
                    placeholder="New York, USA"
                    onChange={(e) =>
                      setPreview((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="form-thumbnail">
                    Image URL
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Optional
                    </span>
                  </FieldLabel>
                  <Input
                    id="form-thumbnail"
                    name="thumbnail"
                    type="text"
                    placeholder="https://…"
                    onChange={(e) =>
                      setPreview((p) => ({ ...p, thumbnail: e.target.value }))
                    }
                  />
                </Field>
              </div>
            </FieldGroup>
          </FormSection>

          {/* 2 — About the event */}
          <FormSection step={2} title="About the event">
            <Field>
              <FieldLabel htmlFor="form-description">
                Description <span className="text-ar-primary">*</span>
              </FieldLabel>
              <Textarea
                id="form-description"
                name="description"
                placeholder="Tell us more about your event..."
                rows={5}
              />
            </Field>
          </FormSection>

          {/* 3 — Volunteer information */}
          <FormSection step={3} title="Volunteer information">
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="form-guidelines">
                  Volunteer Guidelines
                </FieldLabel>
                <Textarea
                  id="form-guidelines"
                  // name="volunteerGuidelines"
                  placeholder="e.g. What volunteers will do, what to bring... (one guideline per line)"
                  rows={3}
                  disabled
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="form-email">
                  Organizer Email <span className="text-ar-primary">*</span>
                </FieldLabel>
                <Input
                  id="form-email"
                  type="email"
                  defaultValue={session?.user?.email || "example@gmail.com"}
                  disabled
                />
                <FieldDescription className="text-muted-foreground text-xs">
                  This is taken from your signed-in account.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FormSection>

          {/* Form actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6">
            <Link href="/events/manage">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-6 font-semibold"
              >
                Manage
              </Button>
            </Link>
            <Button
              type="submit"
              className="h-11 rounded-xl bg-ar-primary px-6 font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
            >
              Create event
            </Button>
          </div>
        </form>

        {/* Sticky live preview */}
        <aside className="sticky top-24 rounded-3xl bg-card/70 p-5 ring-1 ring-foreground/10">
          <div className="flex items-center gap-2 pb-4">
            <Eye className="size-5 text-ar-primary" />
            <h2 className="font-heading text-base font-semibold">
              Event preview
            </h2>
          </div>

          <img
            src={preview.thumbnail || PLACEHOLDER_IMAGE}
            alt="Event cover preview"
            className="aspect-4/3 w-full rounded-xl object-cover"
          />

          <h3 className="mt-4 font-heading text-2xl leading-tight font-bold">
            {preview.title || "Your event preview"}
          </h3>

          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-ar-primary/10 px-3 py-1.5 text-sm font-semibold text-ar-primary ring-1 ring-ar-primary/25">
            {preview.eventType || "Event type"}
          </span>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4 text-ar-primary" />
              {preview.eventDate || "dd/mm/yyyy"}
            </span>
            {preview.location && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-ar-primary" />
                {preview.location}
              </span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t pt-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ar-primary/10 text-ar-primary ring-1 ring-ar-primary/20">
              <User className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-muted-foreground">
                Organized by
              </span>
              <span className="block truncate text-sm font-semibold">
                {session?.user?.name ||
                  session?.user?.email ||
                  "Organizer Name"}
              </span>
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
