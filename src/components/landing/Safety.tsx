const assurances = [
  ["Encrypted end to end", "Your data is encrypted in transit and at rest."],
  ["Biometric + PIN", "Every transaction needs your fingerprint or your PIN."],
  ["Watched around the clock", "Unusual activity is flagged and alerted in real time."],
];

function Shield() {
  return (
    <svg viewBox="0 0 120 146" className="h-full w-full" aria-hidden="true">
      <path
        d="M60 2 4 24v52c0 32 23 55 56 68 33-13 56-36 56-68V24L60 2Z"
        className="fill-accent-1"
      />
      <path
        d="M60 14 16 31v45c0 26 18 45 44 56 26-11 44-30 44-56V31L60 14Z"
        className="fill-accent-panel"
      />
      <path
        d="M40 74l14 14 28-30"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent-1"
      />
    </svg>
  );
}

export default function Safety() {
  return (
    <section id="security" className="relative overflow-hidden bg-canvas-1 pb-24 pt-24 sm:pb-32">
      {/* The wordmark is scenery, not a heading — it never enters the a11y tree. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-wordmark text-[22vw] font-bold leading-[0.8] tracking-[-0.04em] text-accent-panel"
      >
        amini
      </div>

      <div className="container-width -mt-[14vw] flex flex-col items-center">
        <div className="h-[220px] w-[180px]">
          <Shield />
        </div>

        <div className="mt-12 max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">Your money, fully protected</h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-2">
            Amini holds real money, so it is built like it. Funds move through
            licensed payment partners, every transaction is signed off by you,
            and nothing in your wallet moves without your fingerprint or PIN.
          </p>
        </div>

        <dl className="mt-14 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {assurances.map(([title, body]) => (
            <div key={title} className="rounded-xl border border-line-1 p-6 text-center">
              <dt className="text-body-md font-semibold text-ink-1">{title}</dt>
              <dd className="mt-2 text-body-sm text-ink-2">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
