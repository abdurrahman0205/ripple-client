import React from 'react';
import { Button } from '../ui/button';
import { CalendarDays, HeartHandshake, LogIn, Moon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import NavProfile from './NavProfile';
import Image from 'next/image';
import {cn} from '@/lib/utils'
import Logo from '@/assets/images/ripple-log.svg'


const Navbar = () => {


  const nav = [
    {menu: 'Home', link: '/'},
    {menu: 'Upcoming Events', link: '/events'},
    // {menu: 'Navbar', link: '#'},
  ]

  // const NavMenuItem = <>
  //   <ul className='flex items-center gap-2 bg-green-200'>
  //     <li><Link href='#' className=''></Link></li>
      
  //     <li><Link href='#'></Link></li>
  //   </ul>
  // </>

  return (

    <nav className='sticky top-0 z-50 border-b bg-background'>

      <div className='container mx-auto flex h-16 items-center justify-between gap-4 px-4'>

        {/* Left — brand: logo badge + name + tagline */}
        <div className='flex flex-1 items-center gap-20'>
          
          <div className='flex items-center gap-1'>

            <Image src={Logo} width={40} height={40} className='size-30' alt='Ripple Logo' />

            <div className='leading-tight'>
             <span className='text-lg font-bold text-emerald-400'>Ripple</span>
            </div>
          </div>

          <ul className='flex items-center justify-between gap-4'>
            {nav.map(navMenu => <li key={navMenu.menu} className={cn('font-semibold text-sm text-foreground/90')}><Link href={navMenu.link}>{navMenu?.menu}</Link></li>)}
          </ul>

        </div>

        {/* Center — primary nav link */}
        {/* <a
          href='#upcoming-events'
          className='flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <CalendarDays className='size-4' />
          Upcoming Events
        </a> */}

        {/* Right — actions: theme toggle + login */}
        <div className='flex flex-1 items-center justify-end gap-3'>
          <ThemeToggle />
          <NavProfile />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;