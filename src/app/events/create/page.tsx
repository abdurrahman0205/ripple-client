'use client'
import SelectEventType from "@/components/SelectEventType"
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
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"
import { redirect } from "next/navigation"
import { Suspense, useState } from "react"



export default function UpComingEvents() {
  
  const { data: session } = useSession()
  const [eventType, setEventType]= useState()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const eventData = Object.fromEntries(formData.entries())

    const data = {
      ...eventData
    }

    console.log(data, 'before submit');



    // /api/create-events ${process.env.BASE_API_URL}

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/create-events`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    
    const submitted = await res.json();

    if (submitted?.acknowledged) { 
      alert('Successfully added to')
    } else {
      alert('failed!!')
    }

    console.log(submitted, 'after submit');
  }


  return (
    <div className="mt-10">
      <div>

        <div className="border border-emerald-300 mx-auto max-w-lg py-10 px-10 rounded-3xl">

          <div className="my-5">
            <h1 className="text-2xl font-bold">Create Community Events</h1>
          </div>

          <div className="">
            <form
              onSubmit={onSubmit}
              className="w-full">
              <FieldGroup className="space-y-3">
                <Field>
                  <FieldLabel htmlFor="form-name">Event Title:</FieldLabel>
                  <Input
                    name='title'
                    type="text"
                    placeholder="Eg: Donation"
                    required
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">

                  <Field>
                    <FieldLabel htmlFor="form-country">Event Type</FieldLabel>
                    <Select
                      // value={eventType}
                      name="eventType"
                    >
                  <Suspense fallback={<h1>Loading...</h1>}>
                  <SelectEventType  />
                    </Suspense>
                    
                  </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="form-date">Date</FieldLabel>
                    <Input id="form-date" name='eventDate' type="date" placeholder="22-06-2006" />
                  </Field>

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Location</FieldLabel>
                    <Input name='location' type="text" placeholder="New York, USA" />
                  </Field>

                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <Input name='thumbnail' type="text" placeholder="https://...." />
                  </Field>

                </div>

                <Field>
                  <FieldLabel htmlFor="form-address">Description</FieldLabel>
                  <Textarea placeholder="text area" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="form-address">Volunteer Guidelines
                  </FieldLabel>
                  <Input name='description' type="area"  placeholder="123 Main St" disabled />
                </Field>

                <Field>
                  <FieldLabel htmlFor="form-email">Organizer Eamil</FieldLabel>
                  <Input id="form-email" name='organizerEmail' type="email" defaultValue={session?.user?.email || 'example@gmail.com'} disabled  />
                  {/* <FieldDescription>
                    We&apos;ll never share your email with anyone.
                  </FieldDescription> */}
                </Field>

                <Field>
                  <Button type="submit" className='font-semibold py-5'><Plus />Create Event</Button>
                </Field>
              </FieldGroup>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}
