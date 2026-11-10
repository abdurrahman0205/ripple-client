'use client'
import { Pencil } from "lucide-react"
import { useState } from "react"
import type { FormEvent } from "react"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import SelectEventType from "@/components/SelectEventType"
import type { EventData } from "@/lib/type"
import { toast } from "react-toastify"
import { authClient } from "@/lib/auth-client"


export function EditEvent({ event }: { event: EventData }) {
  const [open, setOpen] = useState(false)

  const handleUpdateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const { data, error } = await authClient.token();
    //     const token = data?.token;

    const formData = new FormData(e.currentTarget)
    const updatedData = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/${event._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
          // authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
    const status = await res.json()
console.log(status, 'status');
    if (status.acknowledged) {
      toast.success('Update the event successfully!')
    } else {
      toast.error('Something went wrong!! Try again.')

    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="h-11 w-full rounded-xl text-sm font-semibold"
            title="Edit event"
          >
            <Pencil data-icon="inline-start" />
            Edit
          </Button>
        }
      />

      <PopoverContent
        align="center"
        side="top"
        className="w-[min(92vw,27rem)] gap-0 overflow-hidden rounded-2xl bg-popover p-0 ring-ar-card-border"
      >
        {/* Header strip */}
        <PopoverHeader className="gap-2 bg-ar-primary/10 px-5 py-4">
          <span className="flex size-9 items-center justify-center rounded-xl bg-ar-primary text-ar-primary-foreground">
            <Pencil className="size-4" />
          </span>
          <PopoverTitle className="text-base font-semibold">
            Edit Event
          </PopoverTitle>
          <PopoverDescription className="text-xs">
            Update the details of “
            <span className="font-medium text-foreground">
              {event.title}
            </span>
            ” and save your changes.
          </PopoverDescription>
        </PopoverHeader>

        {/* Form body — scrollable so the popover never overflows the screen */}
        <form onSubmit={handleUpdateEvent}>
          <FieldGroup className="gap-4 max-h-[60vh] overflow-y-auto p-5">
            <Field>
              <FieldLabel htmlFor="edit-title">
                Event Title <span className="text-ar-primary">*</span>
              </FieldLabel>
              <Input
                id="edit-title"
                name="title"
                type="text"
                defaultValue={event.title}
                required
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-type">
                  Event Type <span className="text-ar-primary">*</span>
                </FieldLabel>
                <Select name="eventType" defaultValue={event.eventType}>
                  <SelectEventType />
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-date">
                  Date <span className="text-ar-primary">*</span>
                </FieldLabel>
                <Input
                  id="edit-date"
                  name="eventDate"
                  type="date"
                  defaultValue={event.eventDate}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-location">
                  Location <span className="text-ar-primary">*</span>
                </FieldLabel>
                <Input
                  id="edit-location"
                  name="location"
                  type="text"
                  defaultValue={event.location}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-thumbnail">
                  Image URL
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Optional
                  </span>
                </FieldLabel>
                <Input
                  id="edit-thumbnail"
                  name="thumbnail"
                  type="text"
                  defaultValue={event.thumbnail}
                  placeholder="https://…"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-description">
                Description <span className="text-ar-primary">*</span>
              </FieldLabel>
              <Textarea
                id="edit-description"
                name="description"
                defaultValue={event.description}
                rows={4}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-guidelines">
                Volunteer Guidelines
              </FieldLabel>
              <Textarea
                id="edit-guidelines"
                name="guidelines"
                defaultValue={(event.guidelines ?? []).join("\n")}
                rows={3}
                placeholder="One guideline per line"
                disabled
              />
              <FieldDescription className="text-muted-foreground text-xs">
                Unavailble to edit at the moment.
              </FieldDescription>
            </Field>
          </FieldGroup>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 border-t border-border bg-card/50 p-3 sm:px-5">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl px-5 font-semibold"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 rounded-xl bg-ar-primary px-5 font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
