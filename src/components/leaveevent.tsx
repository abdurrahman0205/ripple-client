'use client'
import React, { SetStateAction } from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { EventData } from '@/lib/type';


const getToken = async () => {
  const { data } = await authClient.token();
  return data?.token;
}

const LeaveEvent = ({ event, setJoined }: { event: EventData, setJoined: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { data: session } = useSession();

  const handleLeaveEvent = async () => {

    const token = getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/leave`,
      {
        method: "DELETE",
        headers: {
          'Content-Type':'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          userEmail: session?.user?.email
        })

      },
    );

    const result = await res.json()
    if (result.acknowledged) {
      setJoined(false);
      toast.success("You left this event.");
    } else {
      toast.error(result?.message || "Could not join the event")
    };
  
  };

  return (
    <Button
      variant="destructive"
            onClick={handleLeaveEvent}
      className="rounded-full px-8 py-6 text-base font-bold text-center items-center justify-center flex">
      <LogOut />
      Leave
      
    </Button>
  );
};

export default LeaveEvent;