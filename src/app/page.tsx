import Banner from "@/components/Banner";
import NewsLetter from "@/components/newsletter";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import LimitedUpComingEvents from "@/components/LimitedUpComingEvents";
import Features from "@/components/Features";

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
