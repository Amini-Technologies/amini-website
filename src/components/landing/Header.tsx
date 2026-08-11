"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WordmarkLink } from "./Brand";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Savings", href: "/#savings" },
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "FAQs", href: "/#faqs" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* On-page anchors belong to Home; /blog and its posts light up Blog. */
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line-1 bg-canvas-1">
      <nav className="container-width flex h-[72px] items-center justify-between gap-6">
        <WordmarkLink />

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const current = isCurrent(item.href);
            return (
              <a
                key={item.name}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`nav-link ${current ? "nav-link-active" : ""}`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#download" className="btn-pill">
            Download App
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-2 transition-colors duration-base ease-standard hover:bg-canvas-2 hover:text-ink-1 lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-line-1 transition-all duration-base ease-standard lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-transparent"
        }`}
      >
        <div className="container-width space-y-1 py-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-body-md font-medium text-ink-2 transition-colors duration-base ease-standard hover:bg-canvas-2 hover:text-ink-1"
            >
              {item.name}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="btn-pill mt-3 w-full">
            Download App
          </a>
        </div>
      </div>
    </header>
  );
}
