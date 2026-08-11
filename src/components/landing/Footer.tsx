import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { StoreButtons, WordmarkLink } from "./Brand";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Savings", href: "/#savings" },
      { name: "Features", href: "/#features" },
      { name: "How it works", href: "/#how-it-works" },
      { name: "FAQs", href: "/#faqs" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Terms & conditions", href: "#" },
      { name: "Delete my account", href: "/delete-account" },
    ],
  },
];

const socials = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
  { name: "X", icon: Twitter, href: "https://x.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-1 bg-canvas-1">
      <div className="container-width py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <WordmarkLink size="lg" />
            <p className="max-w-xs text-body-md text-ink-2">
              A simple, secure way to save, send and pay — built for Nigeria, in
              Hausa and English.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="text-ink-2 transition-colors duration-base ease-standard hover:text-ink-1"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-body-sm font-medium text-ink-2">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-sm text-ink-3 transition-colors duration-base ease-standard hover:text-ink-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-body-sm font-medium text-ink-2">Get the app</h3>
              <StoreButtons className="mt-4 flex-col !items-stretch" />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line-1 pt-8">
          <p className="text-body-sm text-ink-3">
            © {new Date().getFullYear()} Amini Technologies Ltd — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
