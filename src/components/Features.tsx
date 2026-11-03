import React, { Suspense } from 'react';
import SelectEventType from './SelectEventType';

const Features = async () => {
  
  return ( <>
    <div className='flex justify-center items-center my-20 min-h-50'>
      <Suspense fallback={<p>Loading</p>}>

      <SelectEventType />
      </Suspense>
    </div>
  </>
  );
};

export default Features;