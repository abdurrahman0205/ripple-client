import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

/* Shared page intro used by the events list pages — badge + title + short
   description, an optional action slot (right side) and soft brand glows. */
const PageHeader = ({
  badge,
  icon: Icon,
  title,
  description,
  children,
}: {
  badge: string;
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <header>
    {/* Decorative brand glows */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-10 right-8 size-64 rounded-full bg-ar-primary/10 blur-3xl" />
      <div className="absolute top-16 -left-16 size-56 rounded-full bg-ar-accent/10 blur-3xl" />
    </div>

    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <Badge className="h-auto rounded-full bg-ar-primary/10 px-4 py-1.5 text-ar-primary ring-1 ring-ar-primary/25">
          <Icon data-icon="inline-start" />
          {badge}
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
      </div>
      {children ? (
        <div className="flex items-center gap-3">{children}</div>
      ) : null}
    </div>

    <Separator className="my-8" />
  </header>
);

export default PageHeader;
