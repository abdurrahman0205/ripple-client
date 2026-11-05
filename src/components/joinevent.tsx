'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { EventData } from '@/lib/type';

const JoinEvent = ({event} : {event: EventData}) => {


  const [status, setStatus] = useState()

  const handleJoinEvent = async () => {

    const data = {
      ...event,
      joinedBy:[] 
    }

    const res = await fetch(`${process.env.BASE_API_URL}/api/events/join`)

    const resonseFromServer = await res.json()
    const addStatus = resonseFromServer.acknowledgment

    setStatus(addStatus)
  }

  console.log(status, 'added?');
  return (
    <Button
      onClick={handleJoinEvent}
      className="h-12 rounded-xl bg-emerald-300 px-6 text-base font-semibold text-emerald-950 hover:bg-emerald-200">
      <Heart data-icon="inline-start" />
      Join Event
    </Button>
  );
};

export default JoinEvent;