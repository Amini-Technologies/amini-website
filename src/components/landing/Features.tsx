"use client";

import {
  Send,
  Wallet,
  CreditCard,
  Smartphone,
  Fingerprint,
  Bell,
  ArrowLeftRight,
  Banknote,
} from "lucide-react";

const features = [
  {
    name: "Instant Transfers",
    description:
      "Send money to other Amini users instantly and completely free. No waiting, no fees.",
    icon: Send,
    tone: "primary" as const,
  },
  {
    name: "Digital Wallet",
    description:
      "A secure digital wallet to store, send, and receive money anytime, anywhere.",
    icon: Wallet,
    tone: "primary" as const,
  },
  {
    name: "Bill Payments",
    description:
      "Pay for airtime, data, electricity, cable TV, and more right from your phone.",
    icon: CreditCard,
    tone: "accent" as const,
  },
  {
    name: "Bank Transfers",
    description:
      "Withdraw to any Nigerian bank account or receive money via virtual accounts.",
    icon: ArrowLeftRight,
    tone: "primary" as const,
  },
  {
    name: "Biometric Security",
    description:
      "Protect your account with fingerprint or face recognition for maximum security.",
    icon: Fingerprint,
    tone: "primary" as const,
  },
  {
    name: "Real-time Alerts",
    description:
      "Get instant notifications for every transaction and account activity.",
    icon: Bell,
    tone: "accent" as const,
  },
  {
    name: "Virtual Accounts",
    description:
      "Get a dedicated virtual account number to receive transfers from any bank.",
    icon: Banknote,
    tone: "primary" as const,
  },
  {
    name: "Mobile First",
    description:
      "Designed for mobile from the ground up with a beautiful, intuitive interface.",
    icon: Smartphone,
    tone: "primary" as const,
  },
];

const toneStyles = {
  primary: "bg-primary-50 text-primary-600",
  accent: "bg-accent-50 text-accent-600",
};

export default function Features() {
  return (
    <section id="features" className="section-padding relative bg-white">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 mb-6">
            Features
          </div>
          <h2 className="text-balance text-gray-900">
            Everything you need to{" "}
            <span className="text-accent-500">manage your money</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Amini comes packed with features that make managing your finances
            easier than ever before. Simple, secure, and always available.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden border border-gray-200">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative bg-white p-8 transition-colors duration-200 hover:bg-gray-50"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${toneStyles[feature.tone]}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-24 mx-auto max-w-5xl">
          <div className="rounded-3xl border border-gray-200 p-10 sm:p-14 bg-white">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "₦20M+", label: "Transactions" },
                { value: "99.9%", label: "Uptime" },
                {
                  value: (
                    <>
                      4.9<span className="text-accent-500">★</span>
                    </>
                  ),
                  label: "App Rating",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
