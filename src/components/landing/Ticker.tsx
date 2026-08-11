const BILLERS = [
  "MTN",
  "Airtel",
  "Glo",
  "9mobile",
  "DStv",
  "GOtv",
  "StarTimes",
  "AEDC",
  "IKEDC",
  "EKEDC",
  "KEDCO",
  "IBEDC",
  "PHED",
];

/**
 * A single track rendered twice: the animation translates -50%, so the second
 * copy lands exactly where the first began and the loop has no seam.
 */
export default function Ticker() {
  return (
    <section className="border-y border-line-1 bg-canvas-1 py-12">
      <p className="container-width text-center text-body-sm text-ink-2">
        Airtime, data, TV and electricity — the bills you already pay, in one place.
      </p>

      <div className="ticker-mask mt-8 overflow-hidden">
        <ul className="ticker-track flex w-max animate-marquee items-center gap-4 pr-4">
          {[...BILLERS, ...BILLERS].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= BILLERS.length}
              className="shrink-0 rounded-md border border-line-1 px-6 py-3 font-wordmark text-body-md font-semibold tracking-[-0.01em] text-ink-2"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
