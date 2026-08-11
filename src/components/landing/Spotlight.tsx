import { AdashiPhone } from "./DeviceArt";

export default function Spotlight() {
  return (
    <section id="savings" className="section-padding bg-canvas-1">
      <div className="container-width grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-balance text-ink-1">
            The discipline of Adashi, with the safety of a wallet
          </h2>
          <p className="mt-6 text-body-lg text-ink-2">
            Adashi works because everyone shows up. Amini keeps the part that
            works — the circle, the turns, the pressure to contribute — and
            removes the part that doesn&apos;t: cash under a mattress, a notebook
            only one person holds, and a payout you have to chase.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ["One shared ledger", "Every member sees who has paid and whose turn is next."],
              ["Contributions on schedule", "Auto-debit from your wallet, so nobody has to be reminded."],
              ["Payouts land in your wallet", "Spend it, save it, or send it on — the same minute it arrives."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                <span>
                  <span className="text-body-md font-semibold text-ink-1">{title}. </span>
                  <span className="text-body-md text-ink-2">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AdashiPhone />
        </div>
      </div>
    </section>
  );
}
