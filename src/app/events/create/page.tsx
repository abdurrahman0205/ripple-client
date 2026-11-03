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
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { Suspense } from "react"



// const eventTypePromise = async ():Promise<{_id: string, name: string, isCustom:boolean}[]> => {
//   const res = await fetch('http://localhost:5100/api/event-type')
//   return await res.json()
//  }

export default function UpComingEvents() {
  


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())

    console.log(data, 'success');

    const res = fetch(`${process.env.EVENT_TYPES_DATA_URL}/api/post`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })

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

                  {/* <Field>
                    <FieldLabel htmlFor="form-country">Event Type</FieldLabel> */}
                  <Suspense fallback={<h1>Loading...</h1>}>

                  <SelectEventType  />
                  </Suspense>
                  {/* </Field> */}

                  <Field>
                    <FieldLabel htmlFor="form-phone">Date</FieldLabel>
                    <Input id="form-phone" type="date" placeholder="22-06-2006" />
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
                  <FieldLabel htmlFor="form-email">Organizer Email</FieldLabel>
                  <Input id="form-email" name='organizerEmail' type="email" placeholder="john@example.com" />
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
