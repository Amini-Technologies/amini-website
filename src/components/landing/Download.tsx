import { StoreButtons } from "./Brand";

export default function Download() {
  return (
    <section id="download" className="bg-canvas-1 pb-24 sm:pb-32">
      <div className="container-width">
        <div className="rounded-xl bg-accent-panel p-8 sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-xl">
              <h3 className="text-display-xs font-bold leading-tight text-ink-1 sm:text-display-sm">
                Get Amini on your phone today, for free
              </h3>
              <p className="mt-5 text-body-lg text-ink-2">
                Available for <strong className="font-semibold text-ink-1">iOS</strong> and{" "}
                <strong className="font-semibold text-ink-1">Android</strong>. Open an
                account in under five minutes and start your first plan the same day.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <StoreButtons />
              <p className="text-body-sm text-ink-2">
                No account fees. No minimum balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
