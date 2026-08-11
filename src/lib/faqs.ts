/**
 * Shared by the FAQ accordion and the FAQPage JSON-LD on the home page.
 * They have to stay identical — Google treats visible copy that disagrees
 * with the markup as a reason to drop the rich result.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Is Amini free to use?",
    a: "Downloading the app and opening an account is free, and transfers between Amini users cost nothing. Bank withdrawals and bill payments carry the provider's fee, shown to you before you confirm.",
  },
  {
    q: "How does a savings plan work?",
    a: "You choose an amount and a rhythm — daily, weekly or monthly. Amini debits your wallet automatically on schedule, so the habit does not depend on you remembering.",
  },
  {
    q: "Can I withdraw my savings early?",
    a: "Yes. Your savings stay yours. Withdrawing before the date you set breaks the streak on that plan, and the app tells you before you confirm.",
  },
  {
    q: "What is Adashi on Amini?",
    a: "It is the rotating savings circle you already know, run inside the app. Members contribute on a schedule, everyone sees the same ledger, and each payout lands in that member's wallet on their turn.",
  },
  {
    q: "How do I add money to my wallet?",
    a: "Every account gets a dedicated Nigerian account number. Transfer to it from any bank and the money reflects in your wallet.",
  },
  {
    q: "Is my money safe?",
    a: "Funds move through licensed payment partners, data is encrypted in transit and at rest, and every transaction needs your fingerprint or PIN. Unusual activity is flagged and alerted in real time.",
  },
  {
    q: "Does Amini work in Hausa?",
    a: "Yes — the whole app, not just the welcome screen. You can switch between Hausa and English at any time in settings.",
  },
];
