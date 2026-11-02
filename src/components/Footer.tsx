"use client";

import { Globe, Image as ImageIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";

// lucide-react has no brand icons — placeholder SVG marks for the socials.
const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86V21h-4z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14 8.5V7c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.4 3 10.4 4.3 10.4 6.7v1.8H8.5V11h1.9v10H14V11h2.3l.4-2.5H14z" />
  </svg>
);

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0-2.2-.3-3.8-.6-4.6-.3-.8-1-1.4-1.8-1.6C18 5.5 15.5 5.5 12 5.5s-6 0-7.6.3c-.8.2-1.5.8-1.8 1.6C2.3 8.2 2 9.8 2 12s.3 3.8.6 4.6c.3.8 1 1.4 1.8 1.6 1.6.3 4.1.3 7.6.3s6 0 7.6-.3c.8-.2 1.5-.8 1.8-1.6.3-.8.6-2.4.6-4.6zm-12 3V9l5.2 3L10 15z"
    />
  </svg>
);

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Footer layout cloned from the design — layout/UI only, no behavior.
// Colors use shadcn tokens (card / border / muted-foreground ...) so the
// footer adapts automatically to dark and light mode.
const Footer = () => {
  const columns = [
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nós", href: "#" },
        { label: "Serviços", href: "#" },
        { label: "Lorem don't know", href: "#" },
        { label: "Testemunhos", href: "#" },
        { label: "Contacto", href: "#" },
      ],
    },
    {
      title: "Navegação",
      links: [
        { label: "Benefícios principais", href: "#" },
        { label: "Os nossos serviços", href: "#" },
        { label: "Porquê salesforce", href: "#" },
        { label: "Testemunhos", href: "#" },
      ],
    },
  ];

  const contacts = [
    { icon: Mail, label: "info@azimute.pt", href: "mailto:info@azimute.pt" },
    { icon: Phone, label: "+351 123 456 789", href: "tel:+351123456789" },
    { icon: MapPin, label: "Lisboa, Portugal", href: "#" },
  ];

  const socials = [
    { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
    { icon: InstagramIcon, label: "Instagram", href: "#" },
    { icon: FacebookIcon, label: "Facebook", href: "#" },
    { icon: YoutubeIcon, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="w-full bg-background px-4 md:px-0 pt-12">
      <div className="mx-auto max-w-7xl rounded-t-3xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 md:px-14 md:py-14">
        {/* Top — brand + tagline */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logo placeholder — swap with the real logo asset when available */}
            <span className="flex size-9 items-center justify-center rounded-lg border border-border text-blue-600">
              <ImageIcon className="size-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              azimute
            </span>
          </div>
          <p className="text-sm text-foreground md:text-base">
            Transformação digital que realmente funciona.
          </p>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Middle — link columns + language / socials */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-16">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h3 className="text-base font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contacto column */}
            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold text-foreground">
                Contacto
              </h3>
              <ul className="flex flex-col gap-4">
                {contacts.map((contact) => (
                  <li key={contact.label} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-blue-500">
                      <contact.icon className="size-4" />
                    </span>
                    <Link
                      href={contact.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {contact.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Language select + social icons */}
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p>Follow us</p>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom — copyright + legal links */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 Ripples 
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Policy and Privacy
            </Link>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
