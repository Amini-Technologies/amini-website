import { Briefcase, ShoppingBasket, Sprout } from "lucide-react";

const cards = [
  {
    title: "Traders who close the day with cash in hand",
    ground: "bg-accent-1",
    icon: ShoppingBasket,
  },
  {
    title: "Salary earners who want the plan to run itself",
    ground: "bg-ink-1",
    icon: Briefcase,
  },
  {
    title: "Families saving together for Sallah, school and rent",
    ground: "bg-accent-2",
    icon: Sprout,
  },
];

export default function Audiences() {
  return (
    <section className="section-padding bg-canvas-1">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">Designed for everyone</h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-ink-2">
            The same wallet, whether money arrives daily in a market or once a
            month by transfer.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {cards.map(({ title, ground, icon: Icon }) => (
            <div
              key={title}
              className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl p-5 ${ground}`}
            >
              <Icon
                className="absolute -right-8 -top-8 h-56 w-56 text-canvas-1/10"
                strokeWidth={1}
                aria-hidden="true"
              />
              <div className="relative w-full rounded-xl bg-canvas-1/10 p-5 backdrop-blur-md">
                <h3 className="text-body-lg font-semibold leading-snug text-canvas-1">
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
