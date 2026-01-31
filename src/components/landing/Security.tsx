"use client";

import { Shield, Lock, Eye, Server, CheckCircle, Fingerprint } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Bank-Level Encryption",
    description: "Your data is protected with AES-256 encryption, the same standard used by major banks worldwide.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Use your fingerprint or face ID for secure, convenient access to your account.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Built on AWS infrastructure with multiple layers of security, redundancy, and 24/7 monitoring.",
  },
  {
    icon: Eye,
    title: "Fraud Protection",
    description: "Real-time AI-powered monitoring and alerts to protect you from unauthorized transactions.",
  },
];

const certifications = [
  "PCI DSS Compliant",
  "NDIC Insured",
  "CBN Licensed Partner",
  "ISO 27001 Standards",
];

export default function Security() {
  return (
    <section id="security" className="section-padding relative overflow-hidden bg-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary-600/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container-width relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6">
              <Shield className="mr-2 h-4 w-4" />
              Enterprise-Grade Security
            </div>
            <h2 className="text-white text-balance">
              Your money is{" "}
              <span className="text-primary-400">safe with us</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              We take security seriously. Your funds and data are protected by
              industry-leading security measures and monitored 24/7 by our security team.
            </p>

            {/* Certifications */}
            <div className="mt-10 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300"
                >
                  <CheckCircle className="h-4 w-4 text-primary-400" />
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Security features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-primary-500/30"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10 border border-primary-500/20 transition-all group-hover:bg-primary-500/20 group-hover:scale-110">
                  <feature.icon className="h-7 w-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-20">
          <div className="rounded-3xl bg-gradient-to-r from-primary-600/20 via-primary-500/10 to-primary-600/20 backdrop-blur border border-primary-500/20 p-8 sm:p-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">₦50M+</div>
                  <div className="text-gray-400">Insured Deposits</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-primary-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-gray-400">Security Breaches</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/10" />
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-400">Fraud Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
