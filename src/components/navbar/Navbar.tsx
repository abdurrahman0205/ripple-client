import React from 'react';
import { Button } from '../ui/button';
import { CalendarDays, HeartHandshake, LogIn, Moon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import NavProfile from './NavProfile';

// Navbar layout setup by AI: three zones matching the design —
// brand (left) · "Upcoming Events" link (center) · theme toggle + login (right).
// Layout/styling only; existing components and logic were left untouched.
const Navbar = () => {


  const nav = [
    {menu: 'Home', link: '/'},
    {menu: 'Upcoming Events', link: '#'},
    // {menu: 'Navbar', link: '#'},
  ]

  const NavMenuItem = <>
    <ul className='flex items-center gap-2 bg-green-200'>
      <li><Link href='#'></Link></li>
      <li><Link href='#'></Link></li>
    </ul>
  </>

  return (
    // Sticky navbar: pinned to the top of the viewport while the page scrolls — layout change by AI
    <nav className='sticky top-0 z-50 border-b bg-background'>

      <div className='container mx-auto flex h-16 items-center justify-between gap-4 px-4'>

        {/* Left — brand: logo badge + name + tagline */}
        <div className='flex flex-1 items-center gap-20'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 shrink-0 items-center  justify-center rounded-xl border border-emerald-400 text-emerald-400'>
              <HeartHandshake className='size-5' />
            </div>
            <div className='flex flex-col leading-tight'>
              <span className='text-lg font-bold text-emerald-400'>Ripple</span>
              <span className='text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground'>
                Community Action
              </span>
            </div>
          </div>

          <ul className='flex items-center justify-between gap-4'>
            {nav.map(navMenu => <li key={navMenu.menu} className='font-semibold text-sm text-foreground/90'><Link href={navMenu.link}>{navMenu?.menu}</Link></li>)}
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