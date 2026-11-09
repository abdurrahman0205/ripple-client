import Image from "next/image";
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import LimitedUpComingEvents from "@/components/LimitedUpComingEvents";
import NewsLetter from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <LimitedUpComingEvents />
      <Gallery />
      <NewsLetter />
    </main>
  );
}
