'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils'
const ThemeToggle = () => {

  // const themeIcon = () => {
    
  // }
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme, setTheme } = useTheme()
  


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
    // return theme === 'dark'? <><Sun /></>:<><Moon /></>
  }


  console.log(theme, 'this is theme');
  console.log(systemTheme);
  // const handleTheme = () => {
  //   setTheme('light')
  // }

  return (
    <div>
      <Button
        onClick={() => {

          if (theme === 'system') {
            if (systemTheme === 'dark') {
              setTheme('light')
            } else if (systemTheme === 'light') {
              setTheme('dark')
            }
          } else {         
            if (theme === 'dark') {
              setTheme('light')
            } else if (theme === 'light') {
              setTheme('dark')
            }
          }

        }}
        variant={'noDesign'}
        className={cn("rounded-full p-1", "hover:bg-theme-toggle-btn")}
      >
        {theme === 'system' && systemTheme === 'dark' ? <><Sun /></> : theme === 'system' && systemTheme === 'light' ? <><Moon /></> : theme === 'dark' ? <><Sun className='size-5.5' /></> : <><Moon className='size-5.5' /></>}
        </Button>
      {/* <Button
        onClick={() => setTheme('light')}
        className=''><Moon className='bg-none text-lg' /></Button> */}
    </div>
  );
};

export default ThemeToggle;