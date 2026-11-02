import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Colors use shadcn tokens (primary / card / foreground ...) so the
// newsletter section adapts automatically to dark and light mode.
const NewsLetter = () => {
  return (
    <section className="w-full bg-[#b7bdf6] px-4 py-8 dark:bg-background md:px-8 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2.5rem] bg-card shadow-xl md:flex-row">
        {/* Decorative panel */}
        <div className="m-3 h-44 shrink-0 rounded-[2.5rem] bg-[#c9cffa] sm:h-56 dark:bg-secondary md:m-4 md:h-auto md:w-2/5" />

        {/* Content */}
        <div className="flex flex-1 flex-col px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
          <h2 className="text-center font-serif text-3xl leading-tight font-black tracking-wide text-primary uppercase sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Subscribe to
            <br />
            our newsletter
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-foreground sm:text-lg">
            Subscribe and get new and delicious recipes every week. Sweet,
            salty, vegan, healthy and more...
          </p>

          <form className="ml-auto mt-10 w-full max-w-md space-y-4 md:mt-14">
            <Input
              type="text"
              placeholder="Full Name"
              className="h-12 rounded-full px-6 text-right md:text-base"
            />
            <Input
              type="email"
              placeholder="E-mail"
              className="h-12 rounded-full px-6 text-right md:text-base"
            />
            <div className="flex justify-end pt-6">
              <Button className="h-12 rounded-full px-10 text-base font-normal">
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
