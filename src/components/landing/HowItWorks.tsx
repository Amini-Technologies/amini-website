import { DarkPhone } from "./DeviceArt";

const steps = [
  {
    title: "Download the app",
    description: "Free on iOS and Android. Nothing to pay to open an account.",
  },
  {
    title: "Create your account",
    description: "Your phone number, a PIN, and a quick identity check. Under five minutes.",
  },
  {
    title: "Fund it and start saving",
    description:
      "Transfer to your dedicated account number, then set a plan, join a circle, or send money.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-canvas-tint">
      <div className="container-width">
        <div className="overflow-hidden rounded-xl bg-canvas-1">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="p-8 sm:p-12">
              <h2 className="text-ink-1">How it works</h2>

              <ol className="mt-10 space-y-8">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-panel font-wordmark text-body-lg font-bold tabular text-ink-1">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-body-lg font-semibold text-ink-1">{step.title}</h3>
                      <p className="mt-2 text-body-md text-ink-2">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative flex justify-center overflow-hidden px-8 lg:justify-end lg:px-0">
              <DarkPhone className="mb-[-64px] mt-4 lg:mr-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
