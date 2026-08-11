# Amini — Design System Guide

> The system is built on a single brand hue: the Amini primary, `#02534D`.
> There is no second brand colour. Everything below is a tint, a shade, or a
> neutral carrying a faint cast of it — plus three status colours that are
> never allowed to act as branding.

**Where things live**

| File | Contains |
| ---- | -------- |
| `DESIGN.md` | This guide. The rules. |
| `design/tokens.json` | Machine-readable tokens, primitive + semantic. |
| `src/styles/variables.css` | Primitives. Raw values, no meaning. |
| `src/styles/theme.css` | Semantic roles. Light default, dark as a scoped inversion. |
| `tailwind.config.ts` | Binds the roles to utilities. |
| `src/app/globals.css` | Base elements and the component layer. |

Components consume **roles** (`bg-canvas-2`, `text-ink-2`, `border-line-1`),
never primitives and never raw hex. Change a role in `theme.css` and the whole
site moves with it.

---

## Brand voice

Amini moves people's money. The design has one job before it has any other:
look like nothing is going to go wrong.

So the surface is quiet. Large calm fields of near-white, text that sits at
comfortable reading weight, hairlines instead of drop shadows, and one deep
teal that appears only where the user is meant to act. Nothing pulses,
nothing glows, nothing competes for attention with the button that sends the
money. The restraint *is* the trust signal — a fintech that decorates its
balance screen is telling you something about its priorities.

The tone in copy matches: plain, direct, unhurried. "Send money instantly and
free," not "Revolutionise your financial journey." Naira figures are stated,
not softened. Where there is a fee, it is named. The voice assumes an adult
who is busy.

Motion is used to explain, not to entertain: things fade and rise a short
distance, quickly, once. If an animation could be removed without losing
meaning, remove it.

---

## Colors

`accent-1` is `#02534D` — the Amini primary, unchanged. Every other brand
value is derived from it.

### Light (default)

| Token | Hex | Role | Contrast on canvas 1 / 2 / 3 |
| ---------------- | -------- | ------------------------------------- | ---------------- |
| canvas-1 | `#FFFFFF` | Page background, large surfaces | — |
| canvas-2 | `#F4F7F7` | Lifted surfaces, cards, section bands | — |
| canvas-3 | `#EAF0EF` | Inset wells, depressed states | — |
| canvas-tint | `#F9FBFB` | Barely-there brand wash on a full band | — |
| ink-1 | `#0A1F1D` | Primary body text | 17.1 / 15.9 / 14.8 |
| ink-2 | `#455D5A` | Secondary text, labels | 7.1 / 6.6 / 6.1 |
| ink-3 | `#5A716E` | Tertiary text, hints | 5.2 / 4.9 / 4.5 |
| accent-1 | `#02534D` | Primary brand accent | 9.0 / 8.3 / 7.8 |
| accent-2 | `#0D7671` | Secondary accent | 5.5 / 5.1 / 4.7 |
| accent-hover | `#014742` | accent-1 under pointer | — |
| accent-surface | `#EDFAF9` | Accent-tinted well | — |
| accent-panel | `#D0F5F3` | The mint panel — hero, step markers, CTA | — |
| on-accent | `#FFFFFF` | Text/icons on accent-1 (8.9:1) | — |
| line-1 | `#DDE6E5` | Default divider | — |
| line-2 | `#C6D4D2` | Emphasised / hover edge | — |
| line-3 | `#708B88` | Interactive control edge (3.7:1) | — |
| state-ok | `#0F7A4A` | Success, confirmations | 5.4 / 5.0 / 4.7 |
| state-warn | `#9A5B00` | Warnings | 5.4 / 5.0 / 4.7 |
| state-err | `#B4302A` | Errors, destructive actions | 6.2 / 5.7 / 5.4 |

State surfaces — `state-ok-surface` `#E6F4EC`, `state-warn-surface` `#FBF0E0`,
`state-err-surface` `#FBEAE8` — each carry their matching state colour at
≥4.7:1.

### Dark (inverted sections)

Same roles, different values. Nothing in a component changes.

| Token | Hex | Contrast on canvas 1 / 2 / 3 |
| ---------------- | -------- | ---------------- |
| canvas-1 | `#071B19` | — |
| canvas-2 | `#0C2523` | — |
| canvas-3 | `#041312` | — |
| ink-1 | `#F9FBFB` | 17.1 / 15.5 / 18.3 |
| ink-2 | `#A6BFBC` | 9.2 / 8.3 / 9.8 |
| ink-3 | `#89A29F` | 6.6 / 5.9 / 7.0 |
| accent-1 | `#6EDBD6` | 10.8 / 9.8 / 11.5 |
| accent-2 | `#3ABFBA` | 7.9 / 7.2 / 8.4 |
| accent-hover | `#A3EBE8` | — |
| accent-surface | `#0E322F` | — |
| on-accent | `#071B19` | on accent-1: 10.8 |
| line-1 | `#1E3D3A` | — |
| line-2 | `#2C524E` | — |
| line-3 | `#708B88` | 4.9 |
| state-ok | `#4ECB8E` | 8.7 / 7.9 / 9.3 |
| state-warn | `#E5A33D` | 8.2 / 7.4 / 8.7 |
| state-err | `#F08379` | 7.0 / 6.3 / 7.4 |

Every text-bearing token in both themes clears 4.5:1 on all three canvases.
That is a property of the palette, not something each screen has to re-earn.

### The two accents

They are not interchangeable.

- **accent-1** is a *fill*. It belongs on the one primary action in a view and
  nowhere else. A screen with two accent-1 buttons has no primary action.
- **accent-2** is a *mark*. Inline links, the highlighted phrase in a heading
  (`.mark-accent`), supporting icon glyphs, hover states on cards. It carries
  brand presence across the page without spending accent-1's authority.

Icon tiles use `bg-accent-surface` + `text-accent-2` — brand-coloured, but
visibly one rank below any button.

`accent-panel` is neither: it is a *ground*. Large tinted shapes — the hero
copy block, step numbers, FAQ rows, the closing CTA — sit on it, and ink-1
text sits on top at 14.6:1. It never fills a control.

---

## Typography

- **Display** — Readex Pro. Hero text and section titles. Tight tracking,
  tight leading, weight 600–700.
- **Body** — Readex Pro. Paragraphs and UI text. Generous leading.
- **Wordmark** — Inter Black for the `amini` wordmark, Inter Semibold/Bold for
  amounts and other tabular figures. Nothing else. `font-wordmark`.
- **Mono** — Geist Mono. Eyebrows, metadata, code, and tabular numerals in the
  admin surface.

```
display: 32px / 40px / 48px / 64px / 80px
body:    14px / 16px / 18px
mono:    12px / 14px
```

Utilities: `text-display-xs|sm|md|lg|xl`, `text-body-sm|md|lg`,
`text-mono-sm|md`. Line-height and tracking travel with the size — you never
set them by hand.

Defaults applied to bare elements in `globals.css`:

| Element | Mobile | ≥640px | ≥768px | ≥1024px |
| ------- | ------ | ------ | ------ | ------- |
| `h1` | display-xs | display-sm | — | display-lg |
| `h2` | display-xs | display-sm | display-md | — |
| `h3` | body-lg | display-xs | — | — |

Money and metrics take `.tabular` so digits do not jitter between states.

There is no display-64 for body copy and no 15px anywhere. If a size you want
is not on the list, the answer is the nearest step.

---

## Spacing & shape

Base unit **4px**. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

In Tailwind that is `1, 2, 3, 4, 6, 8, 12, 16, 24, 32`. Everything else —
`p-2.5`, `mt-7`, `gap-5` — is off-system. Section rhythm is 96px opening to
128px at `sm` (`.section-padding`); the gutter is 24px opening to 32px
(`.container-width`).

Radii: `sm 4px`, `md 8px`, `lg 12px`, `xl 20px`, `full 9999px`. Rough
allocation: `sm` for tags and tiny chips, `md` for inputs and dense
containers, `lg` for icon tiles and inputs, `xl` for cards and panels, `full`
for buttons and pills.

`rounded-2xl` and `rounded-3xl` are **deprecated aliases** that resolve to
`xl`. They exist so pre-token markup in `/admin` still renders while it is
migrated. Do not reach for them in new work.

---

## Surfaces

Three levels, and they mean something:

```
canvas-1   the page itself
  canvas-2   lifted — cards, section bands, stat panels
  canvas-3   inset — wells, newsletter blocks, depressed states
```

Separation comes from **hairlines** (`line-1`) and the surface step, not from
shadows. `shadow-elevation-1` through `-3` exist for things that genuinely
float above the page — the sticky header, menus, overlays. A card sitting in
the document flow does not float.

Dark sections are a **scoped inversion**, not a second stylesheet. Put
`data-theme="dark"` (or `class="surface-dark"`) on any element and every token
beneath it flips; the element paints its own ground, so a full-bleed dark band
is one attribute:

```tsx
<section data-theme="dark" className="section-padding">
  {/* bg-canvas-2, text-ink-1, btn-primary — all already correct */}
</section>
```

Currently inverted: the download CTA on the landing page, and both legal pages
(`/privacy-policy`, `/delete-account`).

---

## Do's and don'ts

- **Do** use accent-1 sparingly, for primary CTAs only. One per view.
- **Do** reach for accent-2 when you want brand colour that is not a button.
- **Do** maintain at least 4.5:1 contrast on body text — the palette already
  guarantees it, so this means *stay on the tokens*.
- **Do** let hairlines and the canvas step do the separating.
- **Do** put `data-theme="dark"` on a section rather than hand-picking dark
  colours.
- **Don't** mix display and body type in the same line.
- **Don't** use state colours for branding. Green is "it worked", amber is
  "careful", red is "this will delete something". None of them are Amini.
- **Don't** introduce a second brand hue. There was an orange accent; it is
  gone, deliberately.
- **Don't** write a raw hex, an off-scale spacing value, or a sixth radius.
- **Don't** stack shadows on static cards to fake hierarchy.

---

## Agent prompt guide

When pointing an AI tool at this codebase, give it the constraints rather than
the aesthetics. These prompts assume the model can read this file.

**Building a new section**

> Read `DESIGN.md`, then build a `<Pricing />` section for the Amini landing
> page. Use only the semantic Tailwind roles (`canvas-*`, `ink-*`, `accent-*`,
> `line-*`, `state-*`), the fixed type scale (`text-display-*`,
> `text-body-*`, `text-mono-*`), the 4px spacing scale, and the five radii.
> `accent-1` is reserved for the single primary CTA — everything else that
> needs brand colour uses `accent-2` or `bg-accent-surface`. No raw hex, no
> shadows on static cards, no new colours.

**Building a component**

> Add a `StatusPill` component. It takes `status: 'ok' | 'warn' | 'err'` and
> maps to `bg-state-{x}-surface text-state-{x}`, `rounded-full`, `px-3 py-1`,
> `text-mono-sm`. It must read correctly inside a `data-theme="dark"` section
> without any dark-specific classes.

**Building an inverted band**

> Make this section full-bleed dark. Add `data-theme="dark"` to the section
> element and remove any hard-coded light colours — the tokens invert on their
> own. Verify `btn-primary` still reads as the primary action.

**Reviewing a diff**

> Review this diff against `DESIGN.md`. Flag: raw hex values, `gray-*` or
> other stock Tailwind palette classes, off-scale spacing (`p-2.5`, `mt-7`,
> `gap-5`), font sizes outside the three scales, `rounded-2xl`/`rounded-3xl`,
> more than one `accent-1` fill per view, and state colours used decoratively.

**Extending the palette**

> Don't. If a surface or text level is genuinely missing, add it as a new
> *role* in `src/styles/theme.css` pointing at an existing primitive, document
> it in `DESIGN.md` and `design/tokens.json`, and check its contrast on
> canvas-1, canvas-2, and canvas-3 in both themes before using it.

---

## Not yet migrated

`/admin` is an internal surface still written against `gray-*` and the
`primary-*` ramp. It inherits the new radii, type scale, and `.card` /
`.btn-*` / `.input` component classes, so it renders consistently, but its
one-off colour classes have not been converted to roles. The `primary-*` ramp
in `tailwind.config.ts` exists for exactly that reason and should be removed
once admin is on the tokens.
