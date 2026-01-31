"use client";

import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Top right gradient blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-200/50 via-primary-300/30 to-transparent blur-3xl" />

        {/* Bottom left gradient blob */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary-100/60 via-primary-200/40 to-transparent blur-3xl" />

        {/* Center subtle gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-50/30 to-accent-50/30 blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary-50 border border-primary-100 px-5 py-2 text-sm font-medium text-primary-700 animate-fade-in">
              <Sparkles className="mr-2 h-4 w-4" />
              Now available on iOS & Android
            </div>

            <h1 className="text-balance animate-slide-up">
              Smart Money,{" "}
              <span className="gradient-text">Simplified</span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Experience the future of payments with Amini. Free instant transfers,
              seamless bill payments, and a secure digital wallet - all in one
              beautiful app.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <a href="#download" className="btn-primary group w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
                Learn More
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="h-5 w-5 text-primary-500" />
                Bank-level Security
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="h-5 w-5 text-primary-500" />
                Instant Transfers
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="h-5 w-5 text-primary-500" />
                Zero Fees
              </div>
            </div>
          </div>

          {/* Right - Phone mockup with floating cards */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[350px] h-[350px] rounded-full bg-gradient-to-br from-primary-400/20 via-primary-500/10 to-transparent blur-3xl" />
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="relative h-[580px] w-[280px] rounded-[3rem] bg-gray-900 p-3 shadow-2xl ring-1 ring-gray-800 animate-float">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
                <div className="h-full w-full rounded-[2.5rem] bg-gradient-to-b from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
                  {/* App content mockup */}
                  <div className="p-6 h-full flex flex-col">
                    <div className="text-white/80 text-sm">Welcome back</div>
                    <div className="text-white text-2xl font-bold mt-1">Sarah</div>

                    <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur">
                      <div className="text-white/60 text-xs">Total Balance</div>
                      <div className="text-white text-3xl font-bold mt-1">₦ 245,000</div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 text-sm">+12.5% this month</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {["Send", "Request", "Top Up"].map((action) => (
                        <div key={action} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur">
                          <div className="h-10 w-10 rounded-full bg-white/20 mx-auto mb-2" />
                          <div className="text-white text-xs">{action}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur flex-1">
                      <div className="text-white font-medium text-sm mb-3">Recent Activity</div>
                      {[
                        { name: "Netflix", amount: "-₦5,500", type: "expense" },
                        { name: "Salary", amount: "+₦150,000", type: "income" },
                        { name: "Groceries", amount: "-₦12,300", type: "expense" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/20" />
                            <span className="text-white text-sm">{tx.name}</span>
                          </div>
                          <span className={`text-sm ${tx.type === "income" ? "text-green-400" : "text-white"}`}>
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card - left */}
              <div className="absolute -left-20 top-20 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Transfer Sent</div>
                    <div className="text-sm font-semibold">₦25,000</div>
                  </div>
                </div>
              </div>

              {/* Floating card - right */}
              <div className="absolute -right-16 bottom-32 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Secured</div>
                    <div className="text-sm font-semibold text-primary-600">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
