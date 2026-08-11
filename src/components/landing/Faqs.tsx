"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faqs";

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="section-padding bg-canvas-1">
      <div className="container-width">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-ink-1">Here are the answers to your questions</h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-2">
            Still stuck after this? Write to{" "}
            <a
              href="mailto:hello@amini.ng"
              className="font-medium text-accent-2 underline underline-offset-4"
            >
              hello@amini.ng
            </a>{" "}
            and a person will answer.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="overflow-hidden rounded-xl bg-accent-surface">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left"
                  >
                    <span className="text-body-lg font-medium text-ink-1">{faq.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-panel">
                      <Plus
                        className={`h-4 w-4 text-ink-1 transition-transform duration-base ease-standard ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-6 text-body-md text-ink-2"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
