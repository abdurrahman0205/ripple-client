'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UpComingEvents() {
  const eventType = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ]



  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())

    console.log(data, 'success');

    const res = fetch('http://localhost:5100/api/post', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data),
    })

  }


  return (
    <div className="mt-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm mx-auto">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-name">Title:</FieldLabel>
            <Input
              id="form-name"
              name='title'
              type="text"
              placeholder="Evil Rabbit"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-email">Organizer Email</FieldLabel>
            <Input id="form-email" name='organizerEmail' type="email" placeholder="john@example.com" />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
          </Field>
          <div className="grid grid-cols-2 gap-4">

            <Field>
              <FieldLabel htmlFor="form-country">Event Type</FieldLabel>
              <Select items={eventType} defaultValue="us" name='eventType'>
                <SelectTrigger id="form-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {eventType.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

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
            <Input id="form-address" name='description' type="text" placeholder="123 Main St" />
          </Field>
          <Field orientation="horizontal">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
