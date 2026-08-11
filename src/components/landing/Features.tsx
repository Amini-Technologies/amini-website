import {
  Fingerprint,
  Languages,
  PiggyBank,
  Receipt,
  Send,
  Users,
} from "lucide-react";

const features = [
  {
    name: "Savings plans that run themselves",
    description:
      "Pick an amount and a rhythm — daily, weekly, monthly. Amini debits your wallet and keeps the streak.",
    icon: PiggyBank,
  },
  {
    name: "Adashi, kept honest",
    description:
      "Run a rotating circle with people you trust. Shared ledger, scheduled turns, payouts into your wallet.",
    icon: Users,
  },
  {
    name: "Instant transfers",
    description:
      "Send to an Amini tag or any Nigerian bank account. Money moves in seconds, not working days.",
    icon: Send,
  },
  {
    name: "Airtime, data and bills",
    description:
      "Top up MTN, Airtel, Glo and 9mobile, and settle TV and electricity without leaving the app.",
    icon: Receipt,
  },
  {
    name: "Locked behind your fingerprint",
    description:
      "Biometric sign-in and a transaction PIN. Nothing leaves your wallet without you present.",
    icon: Fingerprint,
  },
  {
    name: "Hausa and English",
    description:
      "The whole app, not just the welcome screen. Switch language any time in settings.",
    icon: Languages,
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-canvas-1">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">Everything you need in one app</h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-2">
            Saving, sending and paying usually live in three different places.
            Amini puts them on one balance, with one PIN.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="rounded-xl bg-accent-surface p-6 transition-colors duration-base ease-standard hover:bg-accent-panel"
            >
              <div className="flex items-start gap-3">
                <feature.icon className="mt-0.5 h-6 w-6 shrink-0 text-ink-1" aria-hidden="true" />
                <h3 className="text-body-lg font-semibold leading-snug text-ink-1">
                  {feature.name}
                </h3>
              </div>
              <p className="mt-4 text-body-sm text-ink-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
