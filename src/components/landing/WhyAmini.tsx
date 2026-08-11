import { PhoneFrame } from "./DeviceArt";

const WEEKS = [38, 52, 46, 61, 55, 72, 66, 84, 78, 91, 86, 100];

/**
 * Tinted band with the device bleeding off the bottom edge — the section is
 * `overflow-hidden` and the phone is taller than the space it is given.
 */
export default function WhyAmini() {
  return (
    <section className="overflow-hidden bg-canvas-tint pt-24 sm:pt-32">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">Why choose Amini?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-2">
            Because saving in Nigeria is rarely about willpower — it&apos;s about
            friction. Amini removes the trips, the reminders and the guesswork,
            then shows you exactly what the habit is worth.
          </p>
        </div>

        {/* Fixed-height window: the device is taller than the space it gets, so
            it runs off the bottom of the band on a clean, predictable edge. */}
        <div className="mt-16 flex h-[440px] justify-center overflow-hidden sm:h-[480px]">
          <PhoneFrame
            label="An Amini savings summary: ₦742,000 saved this year, twelve weeks without a missed debit, three active savings plans, two Adashi circles, 48 bills paid and no transfer fees."
            className="max-w-[340px] shrink-0"
          >
            <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-1">
              <div>
                <p className="text-[10px] text-ink-3">Saved this year</p>
                <p className="font-wordmark text-[30px] font-bold leading-tight tabular text-ink-1">
                  ₦742,000
                </p>
                <p className="text-[10px] text-state-ok">12 weeks without a missed debit</p>
              </div>

              <div className="flex h-32 items-end gap-1.5 rounded-lg border border-line-1 p-3">
                {WEEKS.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-sm ${
                      i === WEEKS.length - 1 ? "bg-accent-1" : "bg-accent-2/35"
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Savings plans", "3 active"],
                  ["Adashi circles", "2"],
                  ["Bills paid", "48"],
                  ["Fees on transfers", "₦0"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-accent-surface p-3">
                    <p className="text-[10px] text-ink-2">{label}</p>
                    <p className="font-wordmark text-[14px] font-semibold tabular text-ink-1">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
