import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Newsetter from "@/assets/images/newsletter.svg";
import Image from "next/image";

// Colors use shadcn tokens (primary / card / foreground ...) so the
// newsletter section adapts automatically to dark and light mode.
const NewsLetter = () => {
  return (
    <section className="w-full mt-10 px-4 py-8 dark:bg-background md:px-8 md:py-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between overflow-hidden rounded-[2.5rem] bg-card shadow-xl md:flex-row border border-gray-200 dark:border-gray-600/50">
        

        {/* Content */}
        <div className="flex flex-col px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
          <h2 className="text-center font-serif text-2xl leading-tight font-black tracking-wide text-primary uppercase sm:text-3xl md:text-4xl lg:text-5xl">
            Subscribe <span className="">to</span>
            <br />
            our newsletter
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-center text-base leading-relaxed text-foreground sm:text-sm">
            Subscribe to get new and important events reminder, notification when a events held....
          </p>

          <form className="mt-8 w-full max-w-md space-y-4 md:mt-12">
            <Input
              type="text"
              placeholder="Full Name"
              className="h-12 rounded-full px-6 md:text-base"
            />
            <Input
              type="email"
              placeholder="E-mail"
              className="h-12 rounded-full px-6 md:text-base"
            />
            <div className="flex justify-end pt-6">
              <Button className="h-12 rounded-full px-10 text-base font-normal">
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        {/* Decorative panel */}
        <div className="pr-30 flex  justify-center items-center">
          <Image src={Newsetter} width={300} height={300} alt="newsletter" className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
