"use client";

import Link from "next/link";
import { useState } from "react";
import { Wallet, ArrowLeft, Trash2, AlertTriangle, CheckCircle } from "lucide-react";

export default function DeleteAccountPage() {
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mailtoHref = `mailto:privacy@amini.ng?subject=Account%20%26%20Data%20Deletion%20Request&body=Hello%20Amini%20Team%2C%0A%0AI%20would%20like%20to%20request%20the%20permanent%20deletion%20of%20my%20account%20and%20all%20associated%20personal%20data.%0A%0ARegistered%20phone%20number%3A%20${encodeURIComponent(phone)}%0AReason%3A%20${encodeURIComponent(reason || "Not specified")}%0A%0AI%20understand%20that%20this%20action%20is%20irreversible%20and%20that%20some%20data%20may%20be%20retained%20where%20required%20by%20law.%0A%0AThank%20you.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoHref;
    setSubmitted(true);
  };

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

      <div className="container-width py-16 sm:py-24">
        <div className="max-w-xl mx-auto">

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-state-err-surface text-state-err">
            <Trash2 className="h-6 w-6" />
          </div>

          <h1 className="mb-3 text-ink-1">
            Request Data Deletion
          </h1>
          <p className="mb-8 text-body-lg text-ink-2">
            You can request the permanent deletion of your Amini account and all associated personal data. We will process your request within <strong className="text-ink-1">30 days</strong> and send a confirmation to your registered contact.
          </p>

          {/* Warning */}
          <div className="mb-8 flex gap-3 rounded-lg border border-state-warn/30 bg-state-warn-surface p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-state-warn" />
            <div className="text-body-sm text-ink-2">
              <strong className="text-ink-1">This action is irreversible.</strong> Deleting your account will permanently remove your profile, transaction history, and saved data. Any outstanding balances must be withdrawn before submitting a request. Some data may be retained where required by Nigerian law or for fraud prevention purposes.
            </div>
          </div>

          {submitted ? (
            <div className="flex gap-3 rounded-xl border border-state-ok/30 bg-state-ok-surface p-6">
              <CheckCircle className="h-6 w-6 shrink-0 text-state-ok" />
              <div>
                <p className="mb-1 font-semibold text-ink-1">Request email opened</p>
                <p className="text-body-sm text-ink-2">
                  If your email client didn&apos;t open, send your request manually to{" "}
                  <a href="mailto:privacy@amini.ng" className="text-accent-1 hover:underline">
                    privacy@amini.ng
                  </a>{" "}
                  with the subject <em>Account &amp; Data Deletion Request</em> and your registered phone number.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="phone" className="mb-2 block text-body-sm font-medium text-ink-1">
                  Registered phone number <span className="text-state-err">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input w-full"
                />
              </div>

              <div>
                <label htmlFor="reason" className="mb-2 block text-body-sm font-medium text-ink-1">
                  Reason for deletion <span className="text-ink-3">(optional)</span>
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  placeholder="Let us know why you're leaving..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="input w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-state-err/40 px-6 py-3 text-body-md font-semibold text-state-err transition-colors duration-base ease-standard hover:bg-state-err/10"
              >
                <Trash2 className="h-4 w-4" />
                Submit Deletion Request
              </button>

              <p className="text-center text-body-sm text-ink-3">
                Submitting will open your email client with a pre-filled request. By proceeding, you confirm you are the account holder.
              </p>
            </form>
          )}

          <div className="mt-8 border-t border-line-1 pt-8 text-body-sm text-ink-3">
            Have questions?{" "}
            <a href="mailto:privacy@amini.ng" className="text-accent-1 hover:underline">
              Contact our privacy team
            </a>
            {" "}or read our{" "}
            <Link href="/privacy-policy" className="text-accent-1 hover:underline">
              Privacy Policy
            </Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
