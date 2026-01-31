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
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Digital Wallet",
    description:
      "A secure digital wallet to store, send, and receive money anytime, anywhere.",
    icon: Wallet,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Bill Payments",
    description:
      "Pay for airtime, data, electricity, cable TV, and more right from your phone.",
    icon: CreditCard,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Bank Transfers",
    description:
      "Withdraw to any Nigerian bank account or receive money via virtual accounts.",
    icon: ArrowLeftRight,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Biometric Security",
    description:
      "Protect your account with fingerprint or face recognition for maximum security.",
    icon: Fingerprint,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Real-time Alerts",
    description:
      "Get instant notifications for every transaction and account activity.",
    icon: Bell,
    color: "from-indigo-500 to-violet-500",
  },
  {
    name: "Virtual Accounts",
    description:
      "Get a dedicated virtual account number to receive transfers from any bank.",
    icon: Banknote,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Mobile First",
    description:
      "Designed for mobile from the ground up with a beautiful, intuitive interface.",
    icon: Smartphone,
    color: "from-fuchsia-500 to-pink-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 gradient-bg-subtle" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-b from-primary-100/50 to-transparent blur-3xl -z-10" />

      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
            Features
          </div>
          <h2 className="text-balance">
            Everything you need to{" "}
            <span className="gradient-text">manage your money</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Amini comes packed with features that make managing your finances
            easier than ever before. Simple, secure, and always available.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="group card card-hover cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-24 mx-auto max-w-5xl">
          <div className="rounded-4xl gradient-bg p-10 sm:p-14">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "100K+", label: "Active Users" },
                { value: "₦5B+", label: "Transactions" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9", label: "App Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
