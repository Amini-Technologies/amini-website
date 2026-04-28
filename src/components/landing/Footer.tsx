"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const navigation = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Security", href: "/#security" },
    { name: "Download", href: "/#download" },
    { name: "Blog", href: "/blog" },
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
    <footer className="relative bg-white border-t border-gray-200">
      <div className="container-width pt-20 pb-12">
        {/* Newsletter section */}
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-12 mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900">Stay in the loop</h3>
              <p className="mt-2 text-gray-600">Get the latest updates, news, and special offers.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 w-full sm:w-80"
              />
              <button className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl overflow-hidden">
                <Image src="/app-icon.png" alt="Amini" width={44} height={44} className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Amini</span>
            </Link>
            <p className="text-gray-600 max-w-xs leading-relaxed text-sm">
              The smartest way to send and receive money in Nigeria. Free
              transfers, instant payments, and seamless bill payments.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:hello@amini.ng" className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="h-4 w-4" />
                hello@amini.ng
              </a>
              <a href="tel:+2341234567890" className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Phone className="h-4 w-4" />
                +234 123 456 7890
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-10 w-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Amini Technologies Ltd. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made in Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
