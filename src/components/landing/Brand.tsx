import Image from "next/image";
import Link from "next/link";

/**
 * Wordmark. Inter Black at a tight optical size — the one place on the page
 * that is allowed to leave the Readex Pro family.
 */
export function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/app-icon.png"
        alt=""
        width={size === "lg" ? 40 : 30}
        height={size === "lg" ? 40 : 30}
        className={`overflow-hidden rounded-md object-cover ${
          size === "lg" ? "h-10 w-10" : "h-[30px] w-[30px]"
        }`}
      />
      <span
        className={`font-wordmark font-black leading-none tracking-[-0.02em] text-ink-1 ${
          size === "lg" ? "text-[36px]" : "text-[24px]"
        }`}
      >
        amini
      </span>
    </span>
  );
}

export function WordmarkLink({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <Link href="/" aria-label="Amini — home" className="inline-flex">
      <Wordmark size={size} />
    </Link>
  );
}

function AppleGlyph() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19 0 .5-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66Z" />
    </svg>
  );
}

/**
 * Store badges. Ink-filled by convention — these read as platform chrome,
 * not as an Amini call to action, so accent-1 stays free for the real CTA.
 */
export function StoreButtons({ className = "" }: { className?: string }) {
  const base =
    "inline-flex items-center gap-2.5 rounded-md bg-ink-1 px-4 py-2.5 text-canvas-1 transition-opacity duration-base ease-standard hover:opacity-90";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener" className={base}>
        <AppleGlyph />
        <span className="text-body-sm font-semibold">App Store</span>
      </a>
      <a href="https://play.google.com/store" target="_blank" rel="noopener" className={base}>
        <PlayGlyph />
        <span className="text-body-sm font-semibold">Google Play</span>
      </a>
    </div>
  );
}

/** The rotated scalloped sticker that sits over the hero artwork. */
export function Sticker({ lines }: { lines: string[] }) {
  return (
    <div className="relative h-[132px] w-[132px] rotate-[21deg]">
      <svg viewBox="0 0 130 130" className="h-full w-full" aria-hidden="true">
        <path
          d="M53.1 0C56.8-.2 60.7 3.4 64.9 3.4c5.4 0 10.7-5.9 15.7-2.1 3 2.3 4.3 5.3 8.3 6.8 4.8 1.9 11.7-1.3 14.8 3.9 2.2 3.7 2.1 7.2 5.8 10.2 3.9 3.2 11 2.7 11.6 9.2s-.9 7.4 1.8 11.8c2.7 4.4 6.2 5.2 7 8.8.9 4.2-3.3 8.4-3.2 13.1 0 4.6 4.1 8.7 3.2 12.9-.7 3.6-5 5.7-6.9 8.8-1.9 3.1-1.3 7.2-1.8 11.8-.7 6.5-7.7 6-11.6 9.2-3.9 3.2-3.6 6.5-5.8 10.2-3.1 5.2-10 2-14.8 3.9-4 1.5-5.3 4.5-8.3 6.8-5 3.7-10.2-2.1-15.5-2.1s-10.6 5.9-15.6 2.1c-3-2.3-4.3-5.3-8.3-6.8-4.8-1.9-11.8 1.3-14.9-3.9-2.2-3.7-2.1-7.2-5.8-10.2-3.9-3.2-10.9-2.7-11.6-9.2-.5-4.5.9-7.5-1.8-11.8-1.9-3.1-6.2-5.2-7-8.8-.9-4.2 3.3-8.4 3.2-13.1 0-5.3-5.9-10.5-2.1-15.5 2.3-3 5.3-4.3 6.8-8.3 1.5-4 1-11.7 6.2-14.9 3.7-2.2 7.2-2.1 10.2-5.8 3.2-3.9 2.7-11 9.2-11.6 6.5-.7 7.4.9 11.8-1.8C46.7 5 48.6.2 53.1 0Z"
          className="fill-accent-panel"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {lines.map((line) => (
          <span
            key={line}
            className="font-wordmark text-[15px] font-bold leading-[1.25] text-ink-1"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
