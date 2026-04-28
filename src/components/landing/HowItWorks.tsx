"use client";

import { Download, UserPlus, Wallet, Send, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Download the App",
    description: "Get Amini from the App Store or Google Play Store for free. Available on all devices.",
    icon: Download,
  },
  {
    number: "02",
    title: "Create Your Account",
    description: "Sign up with your phone number and verify your identity in just a few minutes.",
    icon: UserPlus,
  },
  {
    number: "03",
    title: "Fund Your Wallet",
    description: "Add money via bank transfer to your dedicated virtual account instantly.",
    icon: Wallet,
  },
  {
    number: "04",
    title: "Start Transacting",
    description: "Send money instantly to anyone, pay bills, and manage your finances with ease.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding relative bg-gray-50">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 mb-6">
            How It Works
          </div>
          <h2 className="text-balance text-gray-900">
            Get started in{" "}
            <span className="text-accent-500">4 simple steps</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Setting up your Amini account takes less than 5 minutes.
            Start managing your money smarter today.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[calc(50%+2rem)] right-[-1.5rem] h-px bg-gray-200" />
                )}

                <div className="relative bg-white rounded-2xl p-7 border border-gray-200 transition-colors duration-200 hover:border-gray-300">
                  <div className="text-xs font-semibold text-gray-400 tracking-wider">
                    STEP {step.number}
                  </div>

                  <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <step.icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-3 lg:hidden">
                    <ArrowRight className="h-5 w-5 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <a href="#download" className="btn-primary group">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Free to download and use.
          </p>
        </div>
      </div>
    </section>
  );
}
