export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  keywords: string[];
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "adashi-esusu-ajo-group-savings-nigeria",
    title:
      "Adashi, Esusu, Ajo: How Group Savings Work in Nigeria (and How to Do It Safely Online)",
    description:
      "Adashi, Esusu, and Ajo have powered Nigerian communities for generations. Here's how rotating savings groups actually work, why people still trust them more than banks, and how digital group savings remove the risks while keeping the benefits.",
    excerpt:
      "Long before banks reached every village, Nigerians were saving in groups. Here's how Adashi works — and how Amini's digital group savings keeps the social trust without the missing-money stories.",
    date: "2026-04-26",
    readTime: "9 min read",
    category: "Savings",
    author: "The Amini Team",
    keywords: [
      "adashi Nigeria",
      "esusu savings",
      "ajo Nigeria",
      "group savings Nigeria",
      "Amini gudunmawa",
      "rotating savings",
      "ROSCA Nigeria",
    ],
    blocks: [
      {
        type: "p",
        text: "If you grew up in Nigeria, you almost certainly know someone in an Adashi. Maybe your mother runs one with the women at her shop. Maybe your uncle is the trusted collector for a group of mechanics. Maybe you yourself put ₦20,000 in every month and wait for your turn to receive the lump sum. The names change by region — Adashi in the north, Esusu among the Yoruba, Ajo more broadly across the south, Otu in some Igbo communities — but the idea is the same: a small group of people who trust each other pool their money on a fixed schedule, and each member takes the full pot in turn.",
      },
      {
        type: "p",
        text: "It's one of the oldest and most resilient financial products in West Africa. It also has a problem: when the wrong person runs it, the money disappears. This guide explains how Adashi works, why so many Nigerians still prefer it to formal banking, and how digital group savings keep what makes it valuable while removing the failure modes.",
      },
      { type: "h2", text: "How Adashi actually works" },
      {
        type: "p",
        text: "An Adashi (we'll use that name throughout this article — substitute your local term) is a rotating savings and credit association, or ROSCA. The basic mechanic is simple:",
      },
      {
        type: "ol",
        items: [
          "A group of people — usually 5 to 20 — agree on a fixed contribution amount (say ₦20,000) and a schedule (usually weekly or monthly).",
          "Every cycle, each member contributes the same amount into a common pool.",
          "One member receives the full pot. So if 10 people contribute ₦20,000 each, that member walks away with ₦200,000.",
          "On the next cycle, everyone contributes again, and a different member receives the pot.",
          "After every member has had their turn, the cycle either ends or restarts with a new round.",
        ],
      },
      {
        type: "p",
        text: "There's no interest, no profit, and no real 'savings rate' in the financial sense — but Adashi serves a function that traditional savings doesn't. It forces discipline (you can't skip a contribution without breaking trust), it creates a lump sum that would be hard to accumulate alone, and it rotates that lump sum through a community where someone is always benefiting.",
      },
      { type: "h2", text: "Why Nigerians still prefer Adashi to banks" },
      {
        type: "p",
        text: "Walk into any market in Lagos, Kano, or Onitsha and you'll find Adashis running quietly underneath the formal economy. Even highly banked professionals — doctors, software engineers, civil servants — are often in at least one. The reasons go beyond inertia:",
      },
      {
        type: "ul",
        items: [
          "Forced commitment. A bank savings account is one decision: you choose to deposit. An Adashi is twenty decisions, each backed by social pressure. People save more when their peers are watching.",
          "Lump-sum access. Saving ₦20,000 a month in your bank gets you ₦20,000 a month. An Adashi gets you ₦200,000 — usable for school fees, a generator, market stock, a wedding.",
          "No interest, no riba. For Muslim communities especially, interest-bearing savings are religiously problematic. Adashi pays no interest in either direction, which makes it sharia-compatible.",
          "Community trust. Banks are institutions; Adashis are people you see every Sunday at church or every morning at the shop. The relationship is the security.",
          "Low barrier. You don't need a BVN, a current account, or a smartphone to join one. You need to be trustworthy.",
        ],
      },
      { type: "h2", text: "The problems with traditional Adashi" },
      {
        type: "p",
        text: "All the strengths of Adashi come back to one thing: trust. Which is also where it fails. Anyone in Nigeria over the age of 25 has heard at least one story of an Adashi 'collecting' the money and disappearing. The collector — the one person who holds funds between contribution and disbursement — is the single point of failure for the entire group.",
      },
      {
        type: "p",
        text: "Other recurring problems:",
      },
      {
        type: "ul",
        items: [
          "Members defaulting after they've taken their turn. Once you've collected your ₦200,000, your incentive to keep paying drops sharply.",
          "Disputes about turn order, especially when somebody has an emergency and needs to swap.",
          "No record-keeping. When the collector keeps notes in a paper book, there's no audit trail if something goes wrong.",
          "Geographic constraint. Traditional Adashi requires regular physical meetings, which doesn't work for diaspora groups, hybrid workers, or people who relocate.",
          "No protection if the group is mismanaged. There is literally nowhere to file a complaint.",
        ],
      },
      { type: "h2", text: "Digital group savings: keeping what works, fixing what doesn't" },
      {
        type: "p",
        text: "The promise of digital group savings is simple: keep the social structure of Adashi (trusted group, fixed contribution, lump-sum payout, rotating turn) but replace the human collector with software. Funds sit in a regulated, ringfenced wallet. Everyone sees every contribution in real time. Nobody can quietly walk away with the pot, because the pot isn't physically held by anyone — it's released algorithmically on the disbursement date.",
      },
      {
        type: "p",
        text: "Done well, this gives you the discipline and community of Adashi with the auditability and consumer protection of formal banking. Done poorly, it just adds friction.",
      },
      { type: "h2", text: "How Amini's group savings (and Gudunmawa) work" },
      {
        type: "p",
        text: "Amini supports two related but distinct group products:",
      },
      { type: "h3", text: "Group Savings (digital Adashi)" },
      {
        type: "p",
        text: "You create a group, set the contribution amount and schedule, and invite up to 20 members. Members join, agree on the turn order, and link their wallet for automatic debits. On each cycle:",
      },
      {
        type: "ol",
        items: [
          "Every member is auto-debited the agreed contribution.",
          "Funds flow into a ringfenced group pool, visible to all members in real time.",
          "On the disbursement date, the full pot is released to whoever's turn it is.",
          "If a member fails to contribute, the system flags it immediately and the group decides how to proceed — no quiet vanishing.",
        ],
      },
      {
        type: "p",
        text: "Because every contribution and disbursement is logged, there's no 'I paid but he didn't record it' confusion. Because contributions are auto-debited, nobody has to chase anybody. And because the funds sit in regulated infrastructure, nobody can run away with them.",
      },
      { type: "h3", text: "Gudunmawa (collective contributions)" },
      {
        type: "p",
        text: "Gudunmawa — the Hausa word for 'contribution' or 'help' — is for one-off pooling rather than rotating savings. Common use cases: a friend is getting married and you want to collect from twenty people for a joint gift, a family member is sick and the extended family is raising medical funds, a colleague is leaving the office and the team is pooling for a send-off. You set a target, share a link, and contributions flow into a single transparent pool that releases to the recipient when ready.",
      },
      {
        type: "p",
        text: "Both features keep the strongest part of Adashi — community-based saving — while removing the weakest part: a single fallible human holding everyone's cash.",
      },
      { type: "h2", text: "When digital Adashi is right (and when it isn't)" },
      {
        type: "p",
        text: "Digital group savings makes the most sense when:",
      },
      {
        type: "ul",
        items: [
          "Your group is geographically distributed — diaspora, hybrid teams, friends in different cities.",
          "You want auditability and a clear paper trail.",
          "You're worried about the collector's reliability or simply don't want to put one person in that position.",
          "You want to scale beyond the 10–15 person limit that paper-based Adashi tops out at.",
        ],
      },
      {
        type: "p",
        text: "Traditional Adashi still works fine when the group is small, lives in one place, and the collector is genuinely trusted. The two aren't enemies — many Nigerians run a paper Adashi at the market and a digital one with their colleagues.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "Adashi survives because it solves a real human problem: most people save more when their community is involved. The internet didn't make group savings obsolete — it made it scalable, auditable, and free of the one-person-holding-the-money risk that has cost Nigerian families money for generations.",
      },
      {
        type: "p",
        text: "If you've been thinking about starting an Adashi but didn't trust anybody to be the collector, or if you're already in one and tired of chasing late contributions, Amini's group savings does the boring parts for you. The trust still comes from your community. The execution comes from the app.",
      },
    ],
  },
  {
    slug: "how-to-save-money-in-nigeria",
    title:
      "How to Save Money in Nigeria: A Practical Guide to Auto, Target, Locked, and Group Savings",
    description:
      "Saving in Nigeria is hard. Inflation eats fixed deposits, banks pay tiny interest, and willpower fails. Here's how the four modern savings types work — and which one actually fits your goal.",
    excerpt:
      "There's no single 'best' way to save in Nigeria — there are four, each suited to a different goal. This guide breaks down auto, target, locked, and group savings, and how to combine them.",
    date: "2026-04-19",
    readTime: "8 min read",
    category: "Savings",
    author: "The Amini Team",
    keywords: [
      "save money Nigeria",
      "best savings app Nigeria",
      "target savings",
      "locked savings",
      "auto savings Nigeria",
      "Amini savings",
      "personal finance Nigeria",
    ],
    blocks: [
      {
        type: "p",
        text: "Saving money in Nigeria is harder than it sounds on paper. Inflation hovers between 20 and 30 percent in any given year. Bank savings accounts pay 1–4 percent. Treasury bills are better but require capital you might not have. Money sitting in your current account quietly evaporates while you're not looking, and most personal finance advice written for Western audiences doesn't apply.",
      },
      {
        type: "p",
        text: "The good news is that the right savings strategy in Nigeria isn't about finding one magical product — it's about matching the type of saving to the goal. There are four distinct savings approaches that work in 2026, each with a different purpose. This guide breaks them down.",
      },
      { type: "h2", text: "1. Auto Savings — for building the habit" },
      {
        type: "p",
        text: "Auto savings is the closest thing to a 'set it and forget it' savings product in Nigeria. You pick an amount and a schedule, and the system automatically debits your wallet — daily, weekly, or monthly — and moves the funds into a separate savings balance.",
      },
      {
        type: "p",
        text: "The whole point is to remove the decision from the equation. Most people don't fail to save because they can't afford it; they fail because saving is one more thing on a long list of things that need to happen. Once auto-savings is configured, it stops being a decision and starts being default behaviour.",
      },
      { type: "h3", text: "When to use auto savings" },
      {
        type: "ul",
        items: [
          "You want to build the saving habit but keep failing to actually transfer money.",
          "You're comfortable saving smaller amounts more frequently (e.g. ₦500/day) rather than one big chunk.",
          "You want flexibility to withdraw if you really need to — auto savings is usually accessible.",
        ],
      },
      {
        type: "p",
        text: "On Amini, auto savings can be set to any amount and frequency, paused if you need to, and topped up manually whenever you want.",
      },
      { type: "h2", text: "2. Target Savings — for specific goals" },
      {
        type: "p",
        text: "Target savings flips the model: instead of 'I'll save ₦5,000 a week and see what happens', you start with the goal — say ₦600,000 for a Japa visa application by December — and the system works out what you need to contribute to hit it on time.",
      },
      {
        type: "p",
        text: "Target savings makes the abstract concrete. You stop thinking about saving as a generic act and start thinking about it as a project with a deadline. The deadline matters: research consistently shows that goal-based savings completion rates are 2–3x higher than open-ended savings.",
      },
      { type: "h3", text: "When to use target savings" },
      {
        type: "ul",
        items: [
          "You have a specific thing you're saving for — laptop, school fees, business equipment, wedding, rent.",
          "You have a deadline, even a soft one.",
          "You want a visible progress bar to keep you motivated.",
        ],
      },
      { type: "h2", text: "3. Locked Savings — for the times you don't trust yourself" },
      {
        type: "p",
        text: "Locked savings is what it sounds like: you put money in for a fixed term — 30, 90, 180, 365 days — and you can't withdraw until the term ends. In exchange, you typically get a higher interest rate than open savings.",
      },
      {
        type: "p",
        text: "The word 'locked' bothers people. Why would you voluntarily give up access to your own money? Because the inability to withdraw is the entire point. Open savings has one fatal flaw in Nigeria: you'll dip into it. The phone will break. A relative will need help. A NEPA bill will be larger than expected. Open savings on a thousand small problems eventually equals zero savings. Locked savings just doesn't let you.",
      },
      { type: "h3", text: "When to use locked savings" },
      {
        type: "ul",
        items: [
          "You've received a lump sum (bonus, sale of an asset, end-of-year payment) and you want to preserve it.",
          "You want to earn higher interest than a regular savings account.",
          "You know yourself well enough to know that if it's accessible, it'll be spent.",
        ],
      },
      {
        type: "p",
        text: "A common pattern: lock 60–70% of any windfall, leave the rest in a more flexible savings product. You get the interest on the locked portion and the discipline of the lockout, while still having liquidity if you need it.",
      },
      { type: "h2", text: "4. Group Savings — for the social pressure that actually works" },
      {
        type: "p",
        text: "Group savings is the digital evolution of Adashi/Esusu/Ajo. You and a small group of people commit to a fixed contribution on a fixed schedule, the funds pool together, and each member receives the full pot in turn. We've covered this in detail in our Adashi guide, but for completeness: it works because the social commitment is harder to break than a personal one.",
      },
      { type: "h3", text: "When to use group savings" },
      {
        type: "ul",
        items: [
          "You want a lump sum bigger than what you could save alone in the same time.",
          "Your willpower for solo saving is genuinely low and you'll save more if peers are watching.",
          "You're in a community of trusted people — colleagues, family, religious group, friend circle.",
          "You don't need or want interest, just the structure and the lump-sum mechanic.",
        ],
      },
      { type: "h2", text: "How to combine them" },
      {
        type: "p",
        text: "The most effective Nigerian savers don't pick one of the four — they layer them. A common pattern that works:",
      },
      {
        type: "ol",
        items: [
          "Auto-save a small daily amount as your baseline (e.g. ₦500/day = ~₦15,000/month). This builds the habit and creates a buffer.",
          "Run one or two target savings for specific goals over the next 6–12 months — rent, a phone, a course.",
          "When a windfall comes in, lock 60–70% for 90 or 180 days at higher interest.",
          "Join one group savings — modest contribution — for the lump sum and the community.",
        ],
      },
      {
        type: "p",
        text: "Each layer does something the others can't. Auto handles consistency. Target handles motivation. Locked handles discipline. Group handles social commitment.",
      },
      { type: "h2", text: "What about the Naira losing value?" },
      {
        type: "p",
        text: "The honest answer is that no naira-denominated savings product fully outpaces Nigerian inflation right now. If preserving purchasing power is your only goal, you'd want to look at dollar-denominated investments, treasury bills, or assets like real estate. Naira savings is for short-to-medium term goals (months, not years) where liquidity, discipline, and social structure matter more than real return.",
      },
      {
        type: "p",
        text: "That said: not saving at all because savings doesn't beat inflation is a mistake. The discipline you build saving small amounts is what makes it possible to invest larger amounts later, when you have them.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "There's no best savings product in Nigeria — there are four, each one good at something different. Auto savings builds the habit. Target savings turns vague intent into deadlined projects. Locked savings protects you from yourself. Group savings turns your community into your accountability system.",
      },
      {
        type: "p",
        text: "Amini supports all four in one app, with no minimum balances and no withdrawal fees on completed terms. Pick one to start, layer the rest in over time, and stop trying to save through willpower alone.",
      },
    ],
  },
  {
    slug: "how-to-send-money-in-nigeria-for-free",
    title: "How to Send Money in Nigeria for Free in 2026: The Complete Guide",
    description:
      "Tired of bank transfer fees? Learn every legal way to send money in Nigeria without paying charges, including USSD codes, mobile wallets, and the apps that actually offer free transfers in 2026.",
    excerpt:
      "Bank transfer fees add up fast. Here's exactly how Nigerians are sending money to family, friends, and businesses without losing a kobo to charges.",
    date: "2026-04-22",
    readTime: "7 min read",
    category: "Money Transfers",
    author: "The Amini Team",
    keywords: [
      "send money Nigeria free",
      "free bank transfer Nigeria",
      "no fee money transfer Nigeria",
      "Amini transfer",
      "Nigeria fintech 2026",
    ],
    blocks: [
      {
        type: "p",
        text: "If you've ever sent ₦5,000 to a family member and watched the recipient receive ₦4,973, you already know how transfer fees quietly drain Nigerian wallets. The average Nigerian makes more than a dozen transfers a month, and every single one of them is taxed somewhere along the way — by your bank, by NIBSS, or by stamp duty. In a country where margins matter, those tiny deductions add up to real money over a year.",
      },
      {
        type: "p",
        text: "The good news: in 2026, there are more ways to send money in Nigeria for free than ever before. This guide walks through every legitimate option, when to use which, and what to watch out for.",
      },
      { type: "h2", text: "Why traditional bank transfers cost money" },
      {
        type: "p",
        text: "When you send money from one Nigerian bank account to another, your money usually travels through NIBSS Instant Payment (NIP), the rails that power most interbank transfers. The bank charges you a fee for that service — typically ₦10 for transfers under ₦5,000, ₦25 for transfers up to ₦50,000, and ₦50 for anything above. On top of that, the federal government applies a one-off ₦50 electronic money transfer levy (EMTL, formerly stamp duty) on inflows of ₦10,000 or more.",
      },
      {
        type: "p",
        text: "Add it up and a single ₦20,000 transfer can cost you up to ₦75 in combined charges. Multiply that by ten transfers a month and you're paying nearly ₦9,000 a year just to move your own money around.",
      },
      { type: "h2", text: "The free ways to send money in Nigeria" },
      {
        type: "p",
        text: "There are essentially three categories of free transfer methods today: same-bank transfers, peer-to-peer wallet transfers, and digital wallets that explicitly waive charges.",
      },
      { type: "h3", text: "1. Same-bank transfers" },
      {
        type: "p",
        text: "Sending money between two accounts at the same bank is almost always free. If you and the recipient both bank with GTBank, Access, UBA, or Zenith, transfers between you don't touch the NIBSS rails and don't trigger interbank charges. The downside, of course, is that you both have to be at the same bank — which rarely lines up in real life.",
      },
      { type: "h3", text: "2. USSD transfers (with caveats)" },
      {
        type: "p",
        text: "USSD codes like *737# (GTBank) or *901# (Access) are convenient when you don't have data, but they're not free. You still pay the standard NIP transfer fee, and your telco may charge a small session fee on top. Useful in emergencies, not a long-term cost saver.",
      },
      { type: "h3", text: "3. Digital wallets and fintech apps" },
      {
        type: "p",
        text: "This is where the real savings live. Modern Nigerian fintech apps run their own ledgers internally, which means transfers between users on the same platform never touch NIBSS — and therefore cost nothing to process. Apps like Amini have made this their headline feature: free, instant transfers between users, with no monthly fees, no per-transaction charges, and no minimum balance.",
      },
      {
        type: "p",
        text: "The trade-off is that the recipient also needs to be on the same app. The bigger the network, the more useful the wallet — which is why network effects matter so much in this space.",
      },
      { type: "h2", text: "How to actually move money for free, step by step" },
      {
        type: "ol",
        items: [
          "Download a Nigerian fintech wallet that offers free transfers between users (Amini is one option; there are others).",
          "Verify your account with your BVN and a valid ID. This usually takes under five minutes.",
          "Fund your wallet by transferring from your bank to your dedicated virtual account number — this part may still cost the standard NIP fee once, but every subsequent in-app transfer is free.",
          "Send money to anyone else on the platform instantly, with no charges.",
          "For people not on the app, most wallets also offer cheaper bank transfers than your bank — useful as a fallback.",
        ],
      },
      { type: "h2", text: "What about international transfers?" },
      {
        type: "p",
        text: "Sending money to or from Nigeria across borders is a different problem entirely. Services like Wise, Sendwave, and LemFi compete on FX margins and per-transfer fees. Most domestic Nigerian wallets, including Amini, focus on local transfers and bill payments rather than cross-border. If your use case is sending naira between Lagos and Abuja, a domestic wallet is your best bet. If you're sending dollars from London to Port Harcourt, you'll want a dedicated remittance service.",
      },
      { type: "h2", text: "Things to watch out for" },
      {
        type: "ul",
        items: [
          "Free transfers only apply between users on the same platform. Withdrawing to a bank account usually still incurs standard fees.",
          "Some wallets are 'free' but recoup costs through high FX rates or hidden withdrawal limits. Read the fees page carefully.",
          "EMTL (stamp duty) is a government levy, not a bank charge. Even on free platforms, you may still see it on inflows of ₦10,000 or more — though some wallets absorb it on your behalf.",
          "Always check that the platform is licensed by the CBN. Unlicensed apps can disappear with your funds, and you'll have no recourse.",
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "For everyday Nigerian transfers — sending money to family, splitting bills with friends, paying small vendors — there is no longer any reason to pay bank charges. Open a free fintech wallet, get your contacts on it too, and keep the ₦10,000 a year you'd otherwise lose to fees.",
      },
      {
        type: "p",
        text: "Amini was built specifically around this idea: free instant transfers between users, a dedicated virtual account for funding, and bill payments at no markup. If you're tired of watching charges nibble away at every transaction, give it a try.",
      },
    ],
  },
  {
    slug: "bank-transfer-fees-in-nigeria-explained",
    title: "Bank Transfer Fees in Nigeria: How Much Are You Really Paying?",
    description:
      "A complete breakdown of every fee on a Nigerian bank transfer in 2026 — NIBSS charges, EMTL stamp duty, SMS alert fees, and the hidden costs banks don't advertise. Plus how to cut your fees in half.",
    excerpt:
      "Most Nigerians don't realise how many separate fees are stacked into a single bank transfer. Here's the full breakdown — and what you can do about it.",
    date: "2026-04-15",
    readTime: "6 min read",
    category: "Personal Finance",
    author: "The Amini Team",
    keywords: [
      "bank transfer fees Nigeria",
      "NIBSS charges",
      "stamp duty Nigeria",
      "EMTL Nigeria",
      "Nigerian bank charges 2026",
    ],
    blocks: [
      {
        type: "p",
        text: "Most Nigerians have a vague sense that bank transfers cost something, but very few people can tell you exactly what they're paying for. The reality is that a single ₦25,000 transfer involves at least three separate charges — and some banks slip in a fourth or fifth one if you're not paying attention.",
      },
      {
        type: "p",
        text: "This guide breaks down every line item on a Nigerian bank transfer in 2026, so you know exactly what's coming out of your account and where it's going.",
      },
      { type: "h2", text: "The NIP transfer fee" },
      {
        type: "p",
        text: "The largest visible fee on most transfers is the NIBSS Instant Payment (NIP) charge, regulated by the Central Bank of Nigeria. As of the current CBN guideline, banks may charge:",
      },
      {
        type: "ul",
        items: [
          "₦10 for transfers of ₦5,000 and below",
          "₦25 for transfers between ₦5,001 and ₦50,000",
          "₦50 for transfers above ₦50,000",
        ],
      },
      {
        type: "p",
        text: "These are caps, not minimums. In practice, almost every Nigerian commercial bank charges right at the cap. The fee is split between the sending bank, the receiving bank, and NIBSS itself.",
      },
      { type: "h2", text: "The EMTL (stamp duty) levy" },
      {
        type: "p",
        text: "The Electronic Money Transfer Levy is a federal government tax of ₦50 applied to electronic transfers of ₦10,000 or more received into an account. Importantly, EMTL is charged on the receiver, not the sender — but most people only notice it when they look at their own statement and see the ₦50 deducted on incoming payments.",
      },
      {
        type: "p",
        text: "Transfers under ₦10,000 are exempt. Transfers between accounts owned by the same person are also technically exempt, though enforcement varies bank to bank.",
      },
      { type: "h2", text: "VAT on charges" },
      {
        type: "p",
        text: "Here's a fee most people miss: 7.5% VAT is applied on top of the NIP charge itself. So when your bank tells you a transfer costs ₦25, you're actually paying ₦26.88 (₦25 plus ₦1.88 VAT). It's not a lot per transaction, but at the population level it adds up to billions of naira annually.",
      },
      { type: "h2", text: "SMS alert fees" },
      {
        type: "p",
        text: "Most Nigerian banks charge ₦4 per debit-alert SMS, with a 7.5% VAT on top. If you do twenty transactions a month, that's ₦80 in alert fees alone. Some banks now offer free in-app push notifications as an alternative — switching to those instead of SMS can save you the equivalent of a small data plan every month.",
      },
      { type: "h2", text: "Card maintenance fees" },
      {
        type: "p",
        text: "If you have a debit card linked to your account, your bank charges ₦50 per quarter (₦200 a year) as a card maintenance fee. This is separate from any annual fee on premium cards.",
      },
      { type: "h2", text: "Account maintenance fees" },
      {
        type: "p",
        text: "Current accounts (not savings) attract a CBN-regulated Current Account Maintenance Fee (CAMF) of up to ₦1 per ₦1,000 outflow, capped at certain limits. If you're a business or sole trader running heavy outflows through a current account, this is often your single largest banking expense.",
      },
      { type: "h2", text: "What does it all add up to?" },
      {
        type: "p",
        text: "Let's run a realistic example. Say you're a Lagos professional who:",
      },
      {
        type: "ul",
        items: [
          "Sends 15 transfers a month (mostly between ₦5,000 and ₦50,000): ~₦400 in NIP fees",
          "Receives 5 transfers a month above ₦10,000: ₦250 in EMTL",
          "Pays VAT on every NIP fee: ~₦30",
          "Receives ~25 SMS alerts a month: ~₦100 plus VAT",
          "Holds a debit card: ~₦17 a month in card fees",
        ],
      },
      {
        type: "p",
        text: "That's roughly ₦800 a month, or close to ₦10,000 a year, just for the privilege of moving your own money. For a small business doing higher volumes, the number can easily multiply by 5x or 10x.",
      },
      { type: "h2", text: "How to cut your transfer fees" },
      {
        type: "ol",
        items: [
          "Use a fintech wallet for in-network transfers. Apps like Amini don't charge for transfers between users — useful for the people you pay regularly.",
          "Switch SMS alerts to in-app notifications where available. Banks usually allow this in their mobile app settings.",
          "Avoid unnecessary card transactions if your card is rarely used; some banks let you de-link or downgrade the card.",
          "Consolidate transfers. Sending one ₦40,000 transfer instead of four ₦10,000 transfers cuts the NIP charge to a quarter and avoids triggering EMTL multiple times.",
          "For business owners, consider whether a savings account with transactional features is enough — savings accounts don't pay CAMF.",
        ],
      },
      { type: "h2", text: "What about 'free' bank transfer accounts?" },
      {
        type: "p",
        text: "Several Nigerian banks have launched 'zero-fee' digital accounts in recent years (Kuda, Carbon, OPay, ALAT, and others). Most of them are free for in-network transfers and reduced for out-of-network transfers, but EMTL and VAT still apply because those are government levies, not bank charges. Read the fees page carefully — what's free and what isn't varies a lot between providers.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "Nigerian banking fees are individually small but collectively significant. The single highest-impact change most people can make is to move recurring person-to-person payments off the bank rails entirely and onto a free fintech wallet. The bank stays useful for salary, large business payments, and international wires; the wallet handles everyday transfers without the line items.",
      },
      {
        type: "p",
        text: "If you're already using Amini, you've removed the NIP and VAT components for any transfer between Amini users. Pair that with in-app notifications instead of SMS, and a typical professional saves ₦7,000 to ₦12,000 a year — without changing any of their actual financial behaviour.",
      },
    ],
  },
  {
    slug: "pay-bills-online-in-nigeria",
    title: "How to Pay Bills Online in Nigeria: NEPA, DSTV, Airtime & More (2026 Guide)",
    description:
      "Step-by-step guide to paying every common Nigerian bill online — NEPA prepaid and postpaid, DSTV, GOTV, Startimes, airtime and data top-ups, internet, and more. With tips to avoid common pitfalls.",
    excerpt:
      "Skip the queue at the agent's shop. Here's how to pay every common bill in Nigeria from your phone — and the small mistakes that cost people money every week.",
    date: "2026-04-08",
    readTime: "8 min read",
    category: "Guides",
    author: "The Amini Team",
    keywords: [
      "pay bills online Nigeria",
      "buy NEPA token online",
      "pay DSTV online Nigeria",
      "buy airtime online Nigeria",
      "Amini bill payment",
    ],
    blocks: [
      {
        type: "p",
        text: "There was a time, not that long ago, when paying your electricity bill in Lagos meant standing in a queue holding a folded bundle of cash. Today, every common Nigerian bill — light, cable TV, airtime, data, internet, even tax — can be paid from your phone in under thirty seconds. But there are still small details that catch people out: wrong meter numbers, double-deducted accounts, tokens that never arrive.",
      },
      {
        type: "p",
        text: "This guide walks through how to pay every common Nigerian bill online in 2026, what to watch for, and how to handle it when something goes wrong.",
      },
      { type: "h2", text: "1. Paying your NEPA / electricity bill" },
      {
        type: "p",
        text: "Nigerian electricity is now distributed by eleven privatised DisCos (Ikeja Electric, Eko, Abuja, PHED, KEDCO, IBEDC, JEDC, BEDC, EEDC, KAEDCO, AEDC). You don't pay NEPA anymore, technically — you pay your DisCo. But everyone still calls it NEPA, so we will too.",
      },
      { type: "h3", text: "Prepaid meters" },
      {
        type: "p",
        text: "If you have a prepaid meter, you buy electricity tokens. Each token is a 20-digit number you punch into the meter to credit it with units of energy.",
      },
      {
        type: "ol",
        items: [
          "Open your bank app or a fintech wallet like Amini.",
          "Select 'Electricity' or 'Bills' → choose your DisCo.",
          "Enter your meter number (printed on the meter or on a recent bill).",
          "Enter the amount in naira. The system will quote you the units you'll receive at the current tariff.",
          "Confirm. You'll receive the token via SMS or in-app notification within seconds.",
          "Punch the token into your meter. Done.",
        ],
      },
      { type: "h3", text: "Postpaid meters" },
      {
        type: "p",
        text: "Postpaid users pay against an account number, not a meter number. The flow is the same as prepaid except that you enter your account number instead of meter number, and there's no token to enter — your bill is simply credited.",
      },
      {
        type: "p",
        text: "Common pitfall: entering the wrong DisCo. Lagos has two — Ikeja Electric (Yaba, Ikeja, Ikorodu) and Eko (Lagos Island, Lekki, Ajah). Pick the wrong one and the system either rejects the meter number or — worse — accepts it for a meter that isn't yours.",
      },
      { type: "h2", text: "2. Paying for cable TV (DSTV, GOTV, Startimes)" },
      {
        type: "p",
        text: "Cable subscriptions are the simplest bill in the country to pay online because every provider has a clean account-number system.",
      },
      {
        type: "ol",
        items: [
          "Open your wallet or banking app and choose 'TV' or 'Cable'.",
          "Pick your provider (DSTV, GOTV, Startimes, Showmax).",
          "Enter your IUC / smartcard number (10–11 digits, on the front of your decoder or your last bill).",
          "Choose your bouquet (Premium, Compact, Padi, Yanga, etc.) and number of months.",
          "Pay. The subscription activates within a minute or two.",
        ],
      },
      {
        type: "p",
        text: "Tip: most apps cache your IUC number after the first payment, so renewals next month take under ten seconds.",
      },
      { type: "h2", text: "3. Buying airtime and data" },
      {
        type: "p",
        text: "All major Nigerian networks (MTN, Airtel, Glo, 9mobile) accept airtime and data top-ups from every fintech wallet and bank app.",
      },
      {
        type: "ol",
        items: [
          "Choose 'Airtime' or 'Data' in your app.",
          "Pick the network. Most apps auto-detect from the phone number prefix.",
          "Enter the amount (for airtime) or pick a data bundle.",
          "Enter the recipient's phone number — your own, or someone else's.",
          "Pay. Airtime usually credits in under five seconds; data bundles take up to a minute.",
        ],
      },
      {
        type: "p",
        text: "Pricing tip: most fintech apps sell airtime at face value (₦1,000 buys ₦1,000 of credit). Some buggy banking apps occasionally charge a tiny markup or fail and double-debit. If a transaction fails, wait for the bank to auto-reverse it before retrying — within 24 hours is the standard window.",
      },
      { type: "h2", text: "4. Paying for internet (Spectranet, Smile, Tizeti)" },
      {
        type: "p",
        text: "Home internet providers like Spectranet, Smile, Swift, Tizeti (WiFi.com.ng), and FibreOne all accept online payments. The flow mirrors cable TV — provider, account number, plan, amount, pay.",
      },
      { type: "h2", text: "5. Paying tax, government fees, and tickets" },
      {
        type: "p",
        text: "Government services in Nigeria are increasingly online via Remita and the Treasury Single Account (TSA). PAYE, VAT remittance, vehicle registration, NYSC fees, JAMB and WAEC payments, and Federal court filing fees can all be paid through Remita-integrated channels. Most fintech wallets don't yet integrate Remita directly — for these, you'll typically still use your bank app.",
      },
      { type: "h2", text: "Common mistakes (and how to avoid them)" },
      {
        type: "ul",
        items: [
          "Entering the wrong meter or IUC number. Double-check the digits before paying — once funds leave your account, recovery is slow.",
          "Choosing the wrong DisCo or telco. Always confirm the provider matches your meter or phone number prefix.",
          "Retrying a failed transaction immediately. If your wallet says the transaction failed but your account was debited, wait for the auto-reversal (usually 24 hours) before retrying. Otherwise you'll often end up paying twice.",
          "Paying extremely small token amounts. Some DisCos charge a flat 'meter access fee' on every transaction, which makes a ₦200 token bad value compared to a ₦2,000 token.",
          "Ignoring the receipt. Always screenshot or download the receipt; it's the easiest evidence if you need to raise a dispute later.",
        ],
      },
      { type: "h2", text: "What if a transaction fails?" },
      {
        type: "p",
        text: "Failed bill payments fall into two buckets. The first: the transaction failed and you weren't debited. Just retry. The second: you were debited but the bill wasn't credited. In Nigeria this is annoyingly common, and the fix is usually:",
      },
      {
        type: "ol",
        items: [
          "Wait 24 hours. Most fintech and bank reversals are automatic within that window.",
          "If still not reversed, contact the wallet's support with the transaction reference and a screenshot.",
          "If still not resolved within 5 working days, file a complaint with the CBN's Consumer Protection Department. CBN-licensed providers are obligated to respond.",
        ],
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "Online bill payments in Nigeria are no longer the unreliable adventure they were a decade ago. The infrastructure is mostly solid, the experience on most apps is fast, and the small headaches that remain are easy to avoid once you know what to look for.",
      },
      {
        type: "p",
        text: "Amini supports all the bill types covered in this guide — electricity for every major DisCo, all four telcos, cable, internet, and more — without markups on top of the underlying biller's price. Pair that with our free transfers and you can run most of your monthly outflows from a single app, without losing money to charges along the way.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
