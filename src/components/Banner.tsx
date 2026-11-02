import React from 'react';
import { Button } from './ui/button';

const Banner = () => {
  return (
    <section>
      <div className='container'>
        <div className='flex flex-col text-center space-y-5 min-h-125 items-center justify-center'>
          <h1 className='text-3xl font-bold'>Ripple</h1>
          <p className='italic font-semibold'>Small acts. Waves of change.</p>

          <p>Organize community service events, join drives near you, and watch your kindness spread to the people who need it most.</p>
          <div>
            <Button>Explore Events Upcoming</Button>
            <Button>Create Event</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;