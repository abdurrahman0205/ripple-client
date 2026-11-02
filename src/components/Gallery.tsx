import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tag } from 'lucide-react';
import { Button } from './ui/button';

const Gallery = () => {


  const item = <>
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary"><Tag />Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
          A practical talk on component APIs, accessibility, and shipping
          faster.
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  </>

  return (
    <div>
      <div className='flex justify-center items-center mt-10 '>

        <Carousel>
          <CarouselContent>
            <CarouselItem className='basis-1/3'>{item}</CarouselItem>
            <CarouselItem className='basis-1/3'>{item}</CarouselItem>
            <CarouselItem className='basis-1/3'>{item}</CarouselItem>
            <CarouselItem className='basis-1/3'>{item}</CarouselItem>
            <CarouselItem className='basis-1/3'>{item}</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>
    </div>
  );
};

export default Gallery;