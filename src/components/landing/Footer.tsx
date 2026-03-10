"use client";

import Link from "next/link";
import { Wallet, Twitter, Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const navigation = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "Download", href: "#download" },
    { name: "Pricing", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Delete My Data", href: "/delete-account" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-600/5 blur-3xl" />
      </div>

      <div className="relative container-width pt-20 pb-12">
        {/* Newsletter section */}
        <div className="rounded-3xl bg-gradient-to-r from-primary-600/20 via-primary-500/10 to-primary-600/20 backdrop-blur border border-primary-500/20 p-8 sm:p-12 mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white">Stay in the loop</h3>
              <p className="mt-2 text-gray-400">Get the latest updates, news, and special offers.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 w-full sm:w-80"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Wallet className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Amini</span>
            </Link>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              The smartest way to send and receive money in Nigeria. Free
              transfers, instant payments, and seamless bill payments.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:hello@amini.ng" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
                hello@amini.ng
              </a>
              <a href="tel:+2341234567890" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors">
                <Phone className="h-5 w-5" />
                +234 123 456 7890
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Amini Technologies Ltd. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Made with <span className="text-red-500">&#x2764;</span> in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
