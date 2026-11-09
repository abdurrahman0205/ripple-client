'use client'
import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';


const getToken = async () => {
  const { data } = await authClient.token();
  return data?.token;
}

const LeaveEvent = () => {

  const handleLeaveEvent = async () => {

    const token = getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/leave`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },

      },
    );

    const result = await res.json()
    if (result.acknowledged) {
      // setJoined(true);
      toast.success("You left this event.");
    } else toast.error(result?.message || "Could not join the event");

    // setJoined(false);
  
  };

  return (
    <Button
      variant="destructive"
            onClick={handleLeaveEvent}
      className="h-12 rounded-full px-6 text-base font-semibold">
      <LogOut data-icon="inline-start" />
      Leave
      
    </Button>
  );
};

export default LeaveEvent;