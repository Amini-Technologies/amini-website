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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-white/10">
        <div className="container-width flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Amini</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container-width py-16 sm:py-24">
        <div className="max-w-xl mx-auto">

          {/* Icon */}
          <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
            <Trash2 className="h-7 w-7 text-red-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Request Data Deletion
          </h1>
          <p className="text-gray-400 leading-relaxed mb-10">
            You can request the permanent deletion of your Amini account and all associated personal data. We will process your request within <strong className="text-white">30 days</strong> and send a confirmation to your registered contact.
          </p>

          {/* Warning */}
          <div className="flex gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">This action is irreversible.</strong> Deleting your account will permanently remove your profile, transaction history, and saved data. Any outstanding balances must be withdrawn before submitting a request. Some data may be retained where required by Nigerian law or for fraud prevention purposes.
            </div>
          </div>

          {submitted ? (
            <div className="flex gap-3 p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">Request email opened</p>
                <p className="text-sm text-gray-400">
                  If your email client didn&apos;t open, send your request manually to{" "}
                  <a href="mailto:privacy@amini.ng" className="text-primary-400 hover:underline">
                    privacy@amini.ng
                  </a>{" "}
                  with the subject <em>Account &amp; Data Deletion Request</em> and your registered phone number.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Registered phone number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for deletion <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Let us know why you're leaving..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="input w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-medium transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Submit Deletion Request
              </button>

              <p className="text-xs text-gray-500 text-center">
                Submitting will open your email client with a pre-filled request. By proceeding, you confirm you are the account holder.
              </p>
            </form>
          )}

          <div className="mt-10 pt-8 border-t border-white/10 text-sm text-gray-500">
            Have questions?{" "}
            <a href="mailto:privacy@amini.ng" className="text-primary-400 hover:underline">
              Contact our privacy team
            </a>
            {" "}or read our{" "}
            <Link href="/privacy-policy" className="text-primary-400 hover:underline">
              Privacy Policy
            </Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
