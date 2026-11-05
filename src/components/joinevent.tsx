'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { EventData } from '@/lib/type';
import { authClient, useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const JoinEvent = ({event} : {event: EventData}) => {


  const [status, setStatus] = useState(false)
  const {data: session} = useSession()

  const handleJoinEvent = async () => {

    const { data:TokenData, error } = await authClient.token();
    const token = TokenData?.token

    const data = {
      ...event,
      username: session?.user?.name,
      useremail: session?.user?.email,
      joinDate: new Date()
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    // cresonseFromServer.acknowledgment
    
    if (result.acknowledged) {
      setStatus(true)
      toast.success('You joined this event.')
    } else (
      toast.error(result?.message || 'Could not join the event')
    )
    
  }

  return (
    <Button
      onClick={handleJoinEvent}
      className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200">
        
      Join Event
    </Button>
  );
};

export default JoinEvent;