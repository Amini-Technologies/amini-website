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
    <section id="security" className="section-padding relative bg-white">
      <div className="container-width relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 mb-6">
              <Shield className="mr-2 h-4 w-4 text-primary-600" />
              Enterprise-Grade Security
            </div>
            <h2 className="text-gray-900 text-balance">
              Your money is{" "}
              <span className="text-accent-500">safe with us</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              We take security seriously. Your funds and data are protected by
              industry-leading security measures and monitored 24/7 by our security team.
            </p>

            {/* Certifications */}
            <div className="mt-10 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
                >
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Security features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-gray-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-20">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-4">
              <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">₦50M+</div>
                  <div className="text-sm text-gray-500">Insured Deposits</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200" />
              <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="h-12 w-12 rounded-xl bg-accent-50 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-accent-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Security Breaches</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200" />
              <div className="flex items-center gap-4 flex-1 justify-center">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-500">Fraud Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
