"use client";

import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Soft neutral wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white" />

        {/* Top right subtle teal accent */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-200/20 via-primary-300/10 to-transparent blur-3xl" />

        {/* Bottom left subtle orange accent */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent-200/20 via-accent-300/10 to-transparent blur-3xl" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6b7280 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Availability badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-white border border-accent-200 px-5 py-2 text-sm font-medium text-gray-800 animate-fade-in">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
            </span>
            <Sparkles className="mr-2 h-4 w-4 text-accent-500" />
            Now available on iOS & Android
          </div>

          {/* Headline */}
          <h1 className="text-balance animate-slide-up max-w-4xl">
            Smart Money,{" "}
            <span className="text-accent-500">Simplified</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 text-lg sm:text-xl leading-relaxed text-gray-600 max-w-2xl animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Experience the future of payments with Amini. Free instant transfers,
            seamless bill payments, and a secure digital wallet — all in one
            beautiful app.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href="#download"
              className="btn-primary group w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              Learn More
            </a>
          </div>

          {/* Trust badges - clean pill row */}
          <div
            className="mt-14 flex flex-wrap items-center justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-700">
              <Shield className="h-4 w-4 text-primary-600" />
              Bank-level Security
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-accent-500" />
              Instant Transfers
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-700">
              <TrendingUp className="h-4 w-4 text-primary-600" />
              Zero Fees
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 w-full max-w-3xl animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                10K+
              </div>
              <div className="mt-1 text-sm text-gray-500">Active users</div>
            </div>
            <div className="flex flex-col items-center border-x border-gray-200">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                ₦20M+
              </div>
              <div className="mt-1 text-sm text-gray-500">Transferred</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                4.9<span className="text-accent-500">★</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">App rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
