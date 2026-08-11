import { Star } from "lucide-react";

/**
 * ⚠️ PLACEHOLDER COPY — these are not real customer reviews.
 * Replace every entry with a quote you have written consent to publish, and
 * delete this notice. Do not ship invented testimonials on a live product.
 */
const rowOne = [
  { quote: "Setting a weekly plan and forgetting about it is the whole point. I have not missed a week.", name: "Amina B." },
  { quote: "Our Adashi used to live in a notebook. Now everybody can see who has paid.", name: "Musa D." },
  { quote: "Sending to an Amini tag is faster than typing an account number.", name: "Hauwa I." },
];

const rowTwo = [
  { quote: "Buying data and paying the light bill in the same place saved me two apps.", name: "Sadiq A." },
  { quote: "Having it in Hausa meant my mother could actually use it herself.", name: "Zainab K." },
  { quote: "The payout hit my wallet the morning it was my turn. No chasing anyone.", name: "Yusuf O." },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-state-warn text-state-warn" />
      ))}
    </div>
  );
}

function Card({ quote, name }: { quote: string; name: string }) {
  return (
    <li className="flex w-[340px] shrink-0 flex-col gap-4 rounded-xl border border-line-1 bg-canvas-1 p-6">
      <Stars />
      <p className="flex-1 text-body-md text-ink-1">{quote}</p>
      <p className="text-body-sm text-ink-3">{name}</p>
    </li>
  );
}

function Row({
  items,
  reverse = false,
}: {
  items: { quote: string; name: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="ticker-mask overflow-hidden">
      <ul
        className={`ticker-track flex w-max items-stretch gap-5 pr-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <Card key={`${item.name}-${i}`} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section-padding bg-canvas-1">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">What our users say</h2>
          <p className="mt-6 text-body-lg text-ink-2">
            From market stalls in Kano to salaried desks in Lagos.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <Row items={rowOne} />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}
