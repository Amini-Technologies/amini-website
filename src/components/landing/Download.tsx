"use client";

import { Smartphone, Star, Download as DownloadIcon } from "lucide-react";

export default function Download() {
  return (
    <section id="download" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 gradient-bg-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-primary-200/30 via-transparent to-primary-200/30 blur-3xl -z-10" />

      <div className="container-width">
        <div className="relative overflow-hidden rounded-4xl gradient-bg">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Gradient orbs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-24">
            <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-12">
              {/* Left content */}
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm text-white/90 mb-6">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  4.9 Rating on App Stores
                </div>

                <h2 className="text-white">
                  Ready to simplify your finances?
                </h2>
                <p className="mt-6 text-lg text-white/80 leading-relaxed">
                  Download Amini today and join thousands of users who are already
                  experiencing smarter, faster, and more secure money management.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  {/* App Store Button */}
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-900 transition-all hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </a>

                  {/* Play Store Button */}
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-gray-900 transition-all hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Get it on</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>

                {/* Download stats */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <DownloadIcon className="h-4 w-4" />
                    100K+ Downloads
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    iOS & Android
                  </div>
                </div>
              </div>

              {/* Right - Phone illustration */}
              <div className="relative flex-shrink-0">
                <div className="relative">
                  {/* Glow behind phone */}
                  <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-2xl" />

                  {/* Phone */}
                  <div className="relative h-[400px] w-[200px] rounded-[2.5rem] bg-gray-900 p-2.5 shadow-2xl ring-1 ring-white/20">
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full" />
                    <div className="h-full w-full rounded-[2rem] bg-gradient-to-b from-white to-gray-100 overflow-hidden flex flex-col items-center justify-center">
                      <div className="h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center mb-4 shadow-lg">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">Amini</div>
                      <div className="text-sm text-gray-500 mt-1">Smart Money, Simplified</div>

                      {/* QR Code placeholder */}
                      <div className="mt-6 h-28 w-28 rounded-xl bg-white p-2 shadow-lg">
                        <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <div className="text-xs text-gray-400">Scan to</div>
                            <div className="text-xs font-medium text-gray-600">Download</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-8 top-12 bg-white rounded-xl shadow-lg p-3 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 ring-2 ring-white" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-600">+1000 today</span>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-20 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">4.9</span>
                    <span className="text-xs text-gray-500">(12K reviews)</span>
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
