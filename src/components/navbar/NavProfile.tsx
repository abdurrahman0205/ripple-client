'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Handshake, LogIn, LogOut, Plus } from 'lucide-react';
import { signOut, useSession } from '@/lib/auth-client';
import { NavProfileSkeleton } from './NavProfileSkeleton';

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const NavProfile = () => {

  const { data: session, isPending } = useSession();

  if (isPending) {
    return <NavProfileSkeleton />
  }
  

  const handleSignOut = async () => {
    await signOut();
  }


  return (
    <div>

      {session?.user ? <>
        <div className='flex items-center gap-2'>

          <DropdownMenu>
            <div>{session?.user?.name}</div>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
              <AvatarImage src="https://ithub.com/shadcn.png" alt="shadcn" />
              <AvatarFallback className={``}>{session?.user?.name[0]}</AvatarFallback>
            </Avatar></Button>} />
            <DropdownMenuContent
              className='w-fit px-2 py-1'
              align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className='cursor-not-allowed'
                  disabled>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  render={<Link href='/events/create' />}
                >
                  <Plus />
                  Create event
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  render={<Link href='/events/manage' />}
                >
                  <BellIcon />
                  Manage event
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='cursor-pointer'
                  render={<Link href='/events/manage' />}
                >
                  <Handshake />
                  Joined event
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className='cursor-pointer'
              >
                <LogOutIcon />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button //
            onClick={handleSignOut}
            variant='destructive' />
            <LogOut />
          </Button> */}
        </div>
      </> : <>
        <Link href='/sign-in'>

          <Button className='h-9 gap-2 rounded-xl bg-emerald-500 px-4 text-white hover:bg-emerald-600'>
              <LogIn className='size-4' />
              Sign in
          </Button>
        </Link>
      </>}

    </div>
  );
};

export default NavProfile;