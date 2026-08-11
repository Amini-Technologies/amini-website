import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, ArrowLeft, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Amini collects, uses, stores and protects your personal information — and the rights you have over it.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly when you register for an account, including your name, phone number, Bank Verification Number (BVN), and bank account details.",
      "We also automatically collect certain information when you use our services, including transaction data, device identifiers, IP addresses, browser type, and usage logs. This helps us provide, maintain, and improve our platform.",
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to:",
    ],
    list: [
      "Process transactions and payments on your behalf",
      "Verify your identity and prevent fraud or unauthorised access",
      "Provide customer support and respond to your enquiries",
      "Send important account notifications and security alerts",
      "Improve our products, services, and user experience",
      "Comply with legal and regulatory obligations",
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing",
    content: [
      "We do not sell, rent, or trade your personal information to third parties.",
      "We may share your information with trusted service providers (such as payment processors, identity verification providers, and cloud infrastructure partners) strictly as necessary to deliver our services. These partners are contractually obligated to protect your data.",
      "We may also disclose your information when required by law, regulation, or a valid legal process.",
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      "We implement industry-standard security measures including end-to-end encryption, secure HTTPS connections, multi-factor authentication, and regular security audits to protect your personal data.",
      "Access to your information is restricted to authorised personnel only, and all access is logged and monitored.",
      "While we take all reasonable precautions, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      "You have the following rights regarding your personal data:",
    ],
    list: [
      "Access — request a copy of the personal data we hold about you",
      "Correction — request that we correct inaccurate or incomplete data",
      "Deletion — request that we delete your personal data, subject to legal obligations",
      "Portability — request your data in a structured, machine-readable format",
      "Objection — object to certain types of processing, such as marketing",
    ],
    footer: "To exercise any of these rights, please contact us using the details in the Contact section below.",
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: [
      "We retain your personal data for as long as your account is active or as needed to provide our services. We also retain data as necessary to comply with legal obligations, resolve disputes, prevent fraud, and enforce our agreements.",
      "When your data is no longer required, we securely delete or anonymise it.",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies & Analytics",
    content: [
      "Our website uses cookies and similar tracking technologies to enhance your experience, analyse usage patterns, and improve our services.",
      "You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.",
      "We use analytics tools that collect anonymised usage data. These tools do not personally identify you.",
    ],
  },
  {
    id: "third-party-links",
    title: "8. Third-Party Links",
    content: [
      "Our app and website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before providing any personal information.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of material changes via the app, email, or a prominent notice on our website.",
      "Continued use of our services after the effective date of any changes constitutes your acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      "If you have any questions, concerns, or requests relating to this Privacy Policy or your personal data, please contact us:",
    ],
    list: [
      "Email: privacy@amini.ng",
      "Phone: +234 123 456 7890",
      "Address: Lagos, Nigeria",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div data-theme="dark" className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-line-1">
        <div className="container-width flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-1 text-accent-on">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-display text-body-lg font-bold text-ink-1">Amini</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-body-sm text-ink-2 transition-colors duration-base ease-standard hover:text-ink-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line-1">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-accent-2/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-1/5 blur-3xl" />
        </div>
        <div className="relative container-width py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">Legal</div>
            <h1 className="mb-4 text-ink-1">
              Privacy Policy
            </h1>
            <p className="text-body-lg text-ink-2">
              We are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
            </p>
            <p className="mt-4 font-mono text-mono-sm text-ink-3">
              Effective Date: <span className="text-ink-2">March 10, 2026</span>
              &nbsp;&middot;&nbsp;
              Last Updated: <span className="text-ink-2">March 10, 2026</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-width py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-4 font-mono text-mono-sm uppercase tracking-[0.12em] !leading-normal text-ink-3">
                Contents
              </h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block border-l-2 border-transparent py-1 pl-3 text-body-sm text-ink-2 transition-colors duration-base ease-standard hover:border-accent-1 hover:text-accent-1"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#account-deletion"
                  className="block border-l-2 border-transparent py-1 pl-3 text-body-sm text-state-err transition-colors duration-base ease-standard hover:border-state-err"
                >
                  Delete My Account
                </a>
              </nav>
            </div>
          </aside>

          {/* Policy Sections */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-invert prose-gray max-w-none">
              <p className="mb-12 text-body-md text-ink-2">
                At <strong className="text-ink-1">Amini Technologies Ltd</strong>, your privacy is a priority. This Privacy Policy describes how we handle your personal information when you use our mobile application, website, and related services (collectively, the &ldquo;Services&rdquo;). By using our Services, you agree to the practices described in this policy.
              </p>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="mb-4 !text-body-lg font-semibold text-ink-1">{section.title}</h2>
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="mb-4 text-body-md text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-2 mb-4 ml-4">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-body-md text-ink-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="text-body-md text-ink-2">{section.footer}</p>
                  )}
                </section>
              ))}
            </div>

            {/* Account Deletion */}
            <div id="account-deletion" className="mt-12 scroll-mt-24 rounded-xl border border-state-err/30 bg-state-err-surface p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-state-err/15 text-state-err">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 !text-body-lg font-semibold text-ink-1">Request Account &amp; Data Deletion</h2>
                  <p className="mb-6 text-body-sm text-ink-2">
                    You have the right to request the deletion of your Amini account and all associated personal data. Once submitted, we will process your request within <strong className="text-ink-1">30 days</strong> and send a confirmation to your registered contact. Note that some data may be retained where required by law or for fraud prevention purposes.
                  </p>
                  <a
                    href="mailto:privacy@amini.ng?subject=Account%20Deletion%20Request&body=Hello%20Amini%20Team%2C%0A%0AI%20would%20like%20to%20request%20the%20deletion%20of%20my%20account%20and%20all%20associated%20personal%20data.%0A%0ARegistered%20phone%20number%3A%20%5BYour%20phone%20number%5D%0A%0AThank%20you."
                    className="inline-flex items-center gap-2 rounded-full border border-state-err/40 px-4 py-2 text-body-sm font-semibold text-state-err transition-colors duration-base ease-standard hover:bg-state-err/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Request Account Deletion
                  </a>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-8 rounded-xl bg-canvas-3 p-6">
              <p className="text-body-sm text-ink-2">
                This Privacy Policy is governed by the laws of the Federal Republic of Nigeria. If you have a dispute relating to this policy, please contact us first and we will do our best to resolve it.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-line-1 py-8">
        <div className="container-width flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-ink-3">
            &copy; {new Date().getFullYear()} Amini Technologies Ltd. All rights reserved.
          </p>
          <Link href="/" className="text-body-sm text-ink-2 transition-colors duration-base ease-standard hover:text-accent-1">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
