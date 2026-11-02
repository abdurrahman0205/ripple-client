import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/newsletter";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import UpComingEvents from "@/components/UpComingEvents";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <UpComingEvents />
      <Gallery />
      <NewsLetter />
      <Footer />
    </main>
  );
}
