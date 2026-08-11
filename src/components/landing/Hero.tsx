import { Sticker, StoreButtons } from "./Brand";
import { SavingsPhone } from "./DeviceArt";

const HEADLINE = "Save, Send & Pay — All in One App.";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas-1">
      <div className="container-width grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-8 lg:py-24">
        <div>
          {/* Words rise in sequence rather than the block arriving at once. */}
          <h1 className="max-w-[15ch] text-balance text-ink-1">
            {HEADLINE.split(" ").map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="animate-slide-up inline-block"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {word}
                {" "}
              </span>
            ))}
          </h1>

          <div className="panel animate-fade-in mt-8 max-w-xl" style={{ animationDelay: "320ms" }}>
            <p className="text-body-lg text-ink-1">
              Amini is the savings and payments app built for Nigeria. Set a plan
              and let it run, keep an Adashi circle honest, send money in seconds,
              and pay your bills — in Hausa or English.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#download" className="btn-pill">
                Download Now
              </a>
              <a href="#features" className="btn-pill-line">
                See what&apos;s inside
              </a>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-body-sm text-ink-2">The mobile app is available on</p>
            <StoreButtons className="mt-3" />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          {/* Sized to the device so the sticker hangs off its corner rather
              than floating in the column gutter. */}
          <div className="relative w-full max-w-[320px]">
            <div className="absolute -left-8 -top-4 z-10 sm:-left-[104px] sm:-top-3">
              <Sticker lines={["Built for", "how Nigeria", "saves"]} />
            </div>
            <SavingsPhone className="animate-fade-in" />
          </div>
        </div>
      </div>
    </section>
  );
}
