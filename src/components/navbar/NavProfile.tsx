'use client'
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { signOut, useSession } from '@/lib/auth-client';

const NavProfile = () => {

  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
  }


  return (
    <div>

      {session?.user ? <>
        <div className='flex items-center gap-2'>

          <Button
            onClick={handleSignOut}
            variant='destructive'>
            Sign Out
          </Button>
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