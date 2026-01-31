"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Wallet } from "lucide-react";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Security", href: "#security" },
  { name: "Download", href: "#download" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-gray-200/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Amini</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="btn-ghost text-sm"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Link
            href="/admin/login"
            className="btn-ghost text-sm"
          >
            Admin
          </Link>
          <a href="#download" className="btn-primary text-sm py-3 px-6">
            Get Started
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 pb-6 pt-4 bg-white/95 backdrop-blur-xl border-t border-gray-100">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Link
            href="/admin/login"
            className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
          <a
            href="#download"
            className="block btn-primary text-center mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
