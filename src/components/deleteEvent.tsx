'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export function DeleteEvent({id}:{id ?: string}) {


  const handleDeleteEvent = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/events/${id}`, {
      method: 'DELETE'
    })
    const response = await res.json();
    if (response?.acknowledged) {
      
          toast.success("Successfully deleted the event");
        } else {
          toast.error("Event delete failed!!");
    }

    
    console.log(response);
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button
        variant="destructive"
        className="h-11 rounded-xl text-sm font-semibold"
        title="Delete event">
        <Trash2 data-icon="inline-start" />
        Delete</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you want to delete this event?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-destructive' onClick={handleDeleteEvent}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}