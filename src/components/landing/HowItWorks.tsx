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
    <section id="how-it-works" className="section-padding relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary-100/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-primary-100/30 to-transparent blur-3xl" />
      </div>

      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
            How It Works
          </div>
          <h2 className="text-balance">
            Get started in{" "}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Setting up your Amini account takes less than 5 minutes.
            Start managing your money smarter today.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-100" />
                )}

                <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-100">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-8 bg-primary-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary-500/30">
                    Step {step.number}
                  </div>

                  <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg shadow-lg shadow-primary-500/20 transition-transform group-hover:scale-110">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4 lg:hidden">
                    <ArrowRight className="h-6 w-6 text-primary-300 rotate-90" />
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
