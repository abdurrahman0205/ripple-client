"use client";
import { CalendarCheck, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient, useSession } from "@/lib/auth-client";
import type { EventData } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import LeaveEvent from "./leaveevent";



const getToken = async () => {
  const { data } = await authClient.token();
  return data?.token;
}



const JoinEvent =  ({ event, }: { event: EventData, }) => {
  const [joined, setJoined] = useState<boolean>(false);
  const { data: session } = useSession();



  useEffect(() => {
    const statusCheck = async () => {


      const { data, error } = await authClient.token();
      const token = data?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/status-check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", authorization: `Bearer ${ token }`

          },
          body: JSON.stringify({
            userEmail: session?.user?.email,
            eventId: event._id,
          }),
        }
      );

      const result = await res.json();

      setJoined(!!result.users);
    };

    if (session?.user?.email && event._id) {
      statusCheck();
    }
  }, [session?.user?.email, event._id]);


  const userEmaiL = session?.user?.email;

const isOrganizer = !!userEmaiL && userEmaiL === event.organizer;

  const handleJoinEvent = async () => {

    const {_id, ...eventInfo} = event
  
    const token = await getToken();

    const data = {
      ...eventInfo,
      joinedEventId: _id,
      username: session?.user?.name,
      useremail: session?.user?.email,
      joinDate: new Date(),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    

    if (result.acknowledged) {
      setJoined(true)
      toast.success("You joined this event.");
    } else toast.error(result?.message || "Could not join the event");
  };

  
  

  // 1. Organizer -> disabled "Joined"
  if (isOrganizer) {
    return (
      <Button
        variant="destructive"
        className="h-12 rounded-full px-6 text-base font-semibold"
        disabled
      >
        <LogOut data-icon="inline-start" />
        Leave
      </Button>
    );
  }

  // 2. Already joined -> "Leave"
  if (joined) {
    return (
      <>
        <LeaveEvent event={event} setJoined={setJoined} />
      </>
   
    );
  }

  return (
    <Button
      onClick={handleJoinEvent}
      className={cn("h-12 rounded-full bg-ar-primary px-6 text-base font-bold text-ar-primary-foreground shadow-md shadow-ar-primary/25 hover:bg-ar-primary-hover")}
    >
      Join Event
    </Button>
  );
};

export default JoinEvent;
