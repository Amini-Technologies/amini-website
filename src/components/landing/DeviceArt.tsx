import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Home,
  PiggyBank,
  Receipt,
  Signal,
  Smartphone,
  User,
  Users,
  Wifi,
} from "lucide-react";

/**
 * The product artwork on this page is drawn, not photographed — the same
 * tokens as the rest of the site, so it stays honest in both themes and adds
 * no image weight. Swap for real screenshots when the store listing ships.
 */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-2 pt-3 text-ink-2">
      <span className="font-wordmark text-[11px] font-semibold tabular">9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" aria-hidden="true" />
        <Wifi className="h-3 w-3" aria-hidden="true" />
        <span className="ml-0.5 h-2.5 w-5 rounded-[3px] border border-current opacity-60" />
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  dark = false,
  label,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  /* The artwork is a picture made of divs. Give assistive tech the caption a
     screenshot would have had, and hide the scaffolding underneath it. */
  label?: string;
  className?: string;
}) {
  return (
    <div
      {...(dark ? { "data-theme": "dark" } : {})}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`relative aspect-[0.49] w-full max-w-[320px] rounded-[44px] bg-ink-1 p-[10px] ${className}`}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-canvas-1">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-1" />
        <StatusBar />
        {children}
      </div>
    </div>
  );
}

/** Bottom tab bar — grounds the screen so the device never ends in blank space. */
function TabBar({ active = 0 }: { active?: number }) {
  const tabs = [
    { icon: Home, label: "Home" },
    { icon: PiggyBank, label: "Savings" },
    { icon: Users, label: "Adashi" },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="mt-auto flex items-center justify-between border-t border-line-1 px-2 pt-3">
      {tabs.map(({ icon: Icon, label }, i) => (
        <span
          key={label}
          className={`flex flex-1 flex-col items-center gap-1 ${
            i === active ? "text-accent-2" : "text-ink-3"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className="text-[9px] font-medium">{label}</span>
        </span>
      ))}
    </div>
  );
}

function Row({
  icon: Icon,
  title,
  meta,
  amount,
  positive = false,
}: {
  icon: React.ElementType;
  title: string;
  meta: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-surface text-accent-2">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-medium leading-tight text-ink-1">{title}</p>
        <p className="truncate text-[10px] leading-tight text-ink-3">{meta}</p>
      </div>
      <span
        className={`font-wordmark text-[11px] font-semibold tabular ${
          positive ? "text-state-ok" : "text-ink-1"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

/** Hero device: wallet balance, an active savings plan, recent activity. */
export function SavingsPhone(props: { className?: string }) {
  return (
    <PhoneFrame
      label="The Amini home screen: a wallet balance of ₦186,500, a Sallah savings plan 68% funded with a weekly auto-debit, and recent activity for a savings plan, an Adashi contribution, an MTN airtime top-up and an electricity bill."
      {...props}
    >
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-1">
        <div>
          <p className="text-[10px] text-ink-3">Sannu, Amina</p>
          <p className="text-[12px] font-medium text-ink-1">Wallet balance</p>
        </div>

        <div className="rounded-lg bg-accent-1 p-4 text-accent-on">
          <p className="text-[10px] opacity-80">Available</p>
          <p className="font-wordmark text-[26px] font-bold leading-tight tabular">
            ₦186,500
          </p>
          <div className="mt-3 flex gap-2">
            <span className="flex items-center gap-1 rounded-md bg-canvas-1/15 px-2 py-1 text-[10px] font-medium">
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" /> Send
            </span>
            <span className="flex items-center gap-1 rounded-md bg-canvas-1/15 px-2 py-1 text-[10px] font-medium">
              <ArrowDownLeft className="h-3 w-3" aria-hidden="true" /> Add money
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-line-1 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-ink-1">Sallah savings</p>
            <p className="font-wordmark text-[10px] font-semibold tabular text-ink-3">68%</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas-3">
            <div className="h-full w-[68%] rounded-full bg-accent-2" />
          </div>
          <p className="mt-2 text-[10px] text-ink-3">
            ₦68,000 of ₦100,000 · auto-debit every Friday
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <Row icon={PiggyBank} title="Savings plan" meta="Weekly · today" amount="+₦5,000" positive />
          <Row icon={Users} title="Adashi — Kasuwa" meta="Turn 4 of 8" amount="₦12,000" />
          <Row icon={Smartphone} title="MTN airtime" meta="0803 •••• 41" amount="₦1,000" />
          <Row icon={Receipt} title="Electricity" meta="AEDC prepaid" amount="₦7,500" />
        </div>

        <TabBar />
      </div>
    </PhoneFrame>
  );
}

/** Adashi device: the rotating circle, its members and the payout order. */
export function AdashiPhone(props: { className?: string }) {
  const members = ["A", "H", "M", "S", "Y", "Z"];

  return (
    <PhoneFrame
      label="The Adashi screen: a Kasuwa circle with a ₦96,000 payout due in three weeks, six members, and a contributions list showing who has paid this week."
      {...props}
    >
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-1">
        <p className="text-[12px] font-medium text-ink-1">Adashi</p>

        <div className="rounded-lg bg-accent-panel p-4">
          <p className="text-[10px] text-ink-2">Kasuwa circle</p>
          <p className="font-wordmark text-[22px] font-bold leading-tight tabular text-ink-1">
            ₦96,000
          </p>
          <p className="text-[10px] text-ink-2">payout · your turn in 3 weeks</p>
          <div className="mt-3 flex -space-x-2">
            {members.map((m) => (
              <span
                key={m}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent-panel bg-accent-1 font-wordmark text-[10px] font-semibold text-accent-on"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line-1 p-3">
          <p className="text-[11px] font-medium text-ink-1">This week&apos;s contributions</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {[
              ["Amina B.", true],
              ["Hauwa I.", true],
              ["Musa D.", true],
              ["Sadiq A.", false],
            ].map(([name, paid]) => (
              <div key={name as string} className="flex items-center gap-2">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    paid ? "bg-state-ok text-canvas-1" : "border border-line-2"
                  }`}
                >
                  {paid ? <Check className="h-2.5 w-2.5" aria-hidden="true" /> : null}
                </span>
                <span className="flex-1 text-[10px] text-ink-2">{name as string}</span>
                <span className="font-wordmark text-[10px] tabular text-ink-3">₦12,000</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line-1 p-3">
          <p className="text-[10px] text-ink-3">Everyone sees the same ledger.</p>
        </div>

        <TabBar active={2} />
      </div>
    </PhoneFrame>
  );
}

/** Inverted device for the dark band in “How it works”. */
export function DarkPhone(props: { className?: string }) {
  return (
    <PhoneFrame
      dark
      label="The send-money screen in dark mode: ₦25,000 to the Amini tag @hauwa, no fee, arriving instantly, confirmed with a fingerprint."
      {...props}
    >
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-1">
        <p className="text-[12px] font-medium text-ink-1">Send money</p>

        <div className="rounded-lg border border-line-1 p-4">
          <p className="text-[10px] text-ink-3">To</p>
          <p className="font-wordmark text-[15px] font-semibold text-ink-1">@hauwa</p>
          <p className="text-[10px] text-ink-3">Amini tag · verified</p>
        </div>

        <div className="rounded-lg bg-accent-surface p-4">
          <p className="text-[10px] text-ink-2">Amount</p>
          <p className="font-wordmark text-[26px] font-bold leading-tight tabular text-ink-1">
            ₦25,000
          </p>
          <p className="text-[10px] text-ink-2">Fee ₦0 · arrives instantly</p>
        </div>

        <div>
          <p className="text-[10px] text-ink-3">Recent</p>
          <div className="mt-2 flex gap-2">
            {["@musa", "@zainab", "@sadiq"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-line-1 px-2 py-1 text-[10px] text-ink-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) => (
            <span
              key={`${k}-${i}`}
              className="flex h-9 items-center justify-center rounded-md bg-canvas-2 font-wordmark text-[13px] font-medium text-ink-1"
            >
              {k}
            </span>
          ))}
        </div>

        <div className="rounded-md bg-accent-1 py-2.5 text-center text-[12px] font-semibold text-accent-on">
          Confirm with fingerprint
        </div>
      </div>
    </PhoneFrame>
  );
}
