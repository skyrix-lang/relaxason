# Design

How this site looks and why: read it before building or changing a page. The
`design` skill (`.claude/skills/design/SKILL.md`) keeps it in step with the
theme and the pages. Rules, not history.

The site reproduces the previous Relaxa'Son site, which the client knows: its
look is the client's decision. Don't restyle, reword or reorder without being
asked (`AGENTS.md`, "The site and its owner").

## Brief

- **For:** people looking for a sound therapist (sonothérapeute) in Essonne:
  individual sound massages, collective sound journeys, a residential
  seminar, manual drainage and Swedish massage. All in French, addressed as
  "vous", written in Denis Bensoussan's first person.
- **Visitors should:** understand what sound therapy is, find a treatment and
  its price, and get in touch through the contact form (`/contact`).
- **Tone:** calm, warm, reassuring; a wellbeing practice, not a clinic.

## Direction

Soft and airy: a mint-cream page, one teal family for titles, rules, icons and
calls to action, light gradient washes behind panels, rounded cards with soft
teal-tinted shadows, and sections that fade in as they enter the viewport.
Photos of the instruments and of the therapist carry the content.

## Tokens

All in `packages/theme-relaxason/src/theme.css` (what each one does:
`packages/theme-relaxason/AGENTS.md`); the site's own utilities on top of them
(`text-brand-*`, `bg-surface`, `text-body`, the classes below) are in
`apps/web/src/styles.css`.

| Role        | Value                                                                         | Why                                                                    |
| ----------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Brand       | teal scale `--brand-50` to `--brand-900`; `--primary` `#00776a` (`brand-700`) | 700 and darker pass AA as text and under white; lighter teals decorate |
| Surfaces    | `--background` mint cream `#f5fffa`, `--surface` `#f8fdfc`, `--card` white    | a light, fresh page; panels slightly cooler                            |
| Text        | `--foreground` black for titles, `--body` grey `#495057` for running text     | the previous site's greys (Open Color)                                 |
| Accent      | `--accent` purple `#6a3de3`                                                   | the "precautions" notice only                                          |
| Fonts       | Source Sans 3 for text and headings (`--font-heading: var(--font-sans)`)      | Josefin Sans (`--font-display`) is only the site's name in the navbar  |
| Headings    | weight 700, no extra tracking                                                 | firm titles in the body font                                           |
| Radius      | `0.5rem`; cards and panels use `rounded-2xl`                                  | soft, rounded shapes                                                   |
| Layout      | content 76rem, text 65ch, sections 6rem                                       | the previous site's 1152px column and 96px section spacing             |
| Breakpoints | `xs` 576, `sm` 768, `md` 992, `lg` 1200, `xl` 1408                            | the previous site's                                                    |

## Type

Headings use the kit's scale (`packages/ui/src/styles.css`), sized by role,
not by tag:

- `text-h1` (30px, 48px from `sm`): the home hero's title (black, its second
  line in `text-brand-700`) and the page titles of `/soins` and `/contact`,
  through `<SectionTitle as="h1">`.
- `text-h2` (24px, 30px from `sm`): section titles, through `<SectionTitle>`
  (teal, a gradient rule under its first 60%) or `<IconTitle>` (the same, with
  an icon beside it); the shorter page titles of `/sonotherapie`,
  `/mon-parcours`, sign-in and the error pages.
- `text-h3` (18px, 20px from `sm`): titles inside a section, cards and panels,
  in `text-brand-700`.
- No `text-display`: at its size the hero's title wraps badly in its half of
  the hero.
- Running text is `text-body`, often `text-lg` for intros; secondary notes
  `text-sm`.

## Sections and components

- **Page frame:** each route is `page-section` > `page-container` >
  `PageShell` (`apps/web/src/components/page-shell.tsx`), which adds the
  previous site's extra side space below 1200px and a minimum height. Its
  sections are 104px apart from `sm` (`sm:[--section-space:6.5rem]`).
- **Page header:** a `SectionTitle as="h1"` and an intro paragraph in
  `text-lg text-body`; centred on `/soins` (intro about 800px wide) and
  `/contact`, left-aligned beside the photo on `/sonotherapie` and
  `/mon-parcours`.
- **Home sections** (`apps/web/src/components/home/`): a full-width hero on a
  teal gradient (`bg-hero`) with the mountain line under it (`hero-wave`), the
  logo, and two buttons; a text-and-round-photo intro; four benefit cards on a
  wash (`bg-benefits`); two service cards; a testimonials carousel; a
  dark-teal call to action (`bg-cta`) with a white button. Every section keeps
  its content in the one 1152px column; backgrounds span the full width.
- **Treatment sections** (`apps/web/src/components/care/`, one per treatment,
  with its anchor): photo and text side by side from `md`, the text first on
  small screens; `IconTitle`; panels with a wash (`sono-section`, `bg-wash`,
  `bg-soft-panel`); quotes in `quote-block` (teal left border); a duration
  badge; the pricing table.
- **Cards:** `service-card` (white, rounded, soft shadow, lifts on hover).
- **Contact:** the details panel (`bg-wash-reverse`), the form (`form-input`
  fields, an animated check and confetti when sent), the FAQ.
- **Motion:** sections fade in and rise on entering the viewport
  (`components/reveal.tsx`); none of it with reduced motion.
- **Buttons:** `cta` (teal gradient) for the main action, `outline` or `soft`
  beside it, `inverse` (white) on the dark call to action. Links styled as
  buttons use `buttonVariants()`.

## Imagery and icons

- Photos (`apps/web/src/assets/`): the instruments (`outils.jpg`,
  `bols-dos.jpg`), a massage (`massage.jpg`), the therapist (`portrait.jpg`),
  the watercolour logo (`logo-relaxason*.{png,webp}`). Rounded corners or a
  circle with a pale teal border; meaningful alt text in French.
- The seminar and drainage photos are still to come:
  `components/image-placeholder.tsx` stands in.
- Icons: Lucide plus the site's own (`components/icons.tsx`), in
  `text-brand-500`, `aria-hidden` next to a text.
- One embedded video (YouTube, on `/sonotherapie`), allowed by the CSP.

## Do and don't

- Do use the theme's tokens and the site's classes for every colour and
  heading; teal text is `brand-700` or darker.
- Do put a new page in `page-section` > `page-container` > `PageShell`, like
  the others.
- Don't change a size, spacing, colour or text the client hasn't asked to
  change.
- Don't use the lighter teals (600 and below) for text or under white text.
- Don't name the former workshop partner anywhere.

## Pages

| Page            | Kind   | Sections                                                                                   |
| --------------- | ------ | ------------------------------------------------------------------------------------------ |
| `/`             | public | hero; intro to sound therapy; benefits; services; testimonials; call to action             |
| `/sonotherapie` | public | what sound therapy is (text and photo); its benefits; a quote; the video; a call to action |
| `/soins`        | public | header; sound massage; collective journey; seminar; drainage; Swedish massage; prices      |
| `/mon-parcours` | public | portrait and the therapist's story and trainings                                           |
| `/contact`      | public | header; contact details and form side by side; FAQ                                         |
| `/sign-in`      | app    | one narrow card: title, text, sign-in button                                               |
