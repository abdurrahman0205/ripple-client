import React, { use } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel } from './ui/field';


// const getEvent = async () => {
//   const res = await fetch(
//     `${process.env.BASE_API_URL as string}/api/event-type`
//   );

//   // const res = await fetch(
//   //   `http://localhost:5100/api/event-type`
//   // );

//   if (!res.ok) {
//     throw new Error(
//       `Failed to fetch event types: ${res.status}`
//     );
//   }
const getEvent = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL as string}/api/event-type`);

    if (!res.ok) {
      console.warn(`Failed to fetch event types: ${res.status}. Using fallback layout.`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Network error fetching event types:", error);
    return [];
  }
};

const eventTypesPromise = getEvent();

const SelectEventType = () => {


  const eventTypes = use(eventTypesPromise)
  // const res = await fetch(
  //   "http://localhost:5100/api/event-type"
  // );
  // const eventTypes = await res.json();
  // const eventTypes = [

  //   { "name": "Donation", "isCustom": false },
  //   { "name": "Cleanup", "isCustom": false },
  //   { "name": "Tree Plantation", "isCustom": false },
  //   { "name": "Health Camp", "isCustom": false },
  //   { "name": "Blood Donation", "isCustom": false },
  //   { "name": "Education", "isCustom": false }
  // ];


  // console.log(eventTypes);

  return (<>
    <Field>
      <FieldLabel htmlFor="form-country">Event Type</FieldLabel>
      <Select >
        <SelectTrigger >
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            {eventTypes.map((eventType: { name: string, isCustom: boolean }) => (
              <SelectItem key={eventType.name} value={eventType.name}>
                {eventType.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </Field>
  </>
  );
};

export default SelectEventType;