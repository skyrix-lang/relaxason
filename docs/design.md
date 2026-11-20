# Design

How this site looks and why: read it before building or changing a page. The
`design` skill (`.claude/skills/design/SKILL.md`) writes it with the person;
keep it in step with the theme and the pages. Rules, not history.

The site reproduces the previous one, which the client knows: don't restyle
it without being asked. This file records what exists; see
`docs/customizing.md` for the brand's files.

## Brief

- **For:** people looking for a sonotherapist, in French.
- **Visitors should:** understand the treatments, then book through the
  contact form.
- **Tone:** calm, warm, in the therapist's first person.

## Direction

Teal on a mint page, Source Sans 3 for text and Josefin Sans for the site's
name, as on the previous site.

## Tokens

In `packages/theme-relaxason/src/theme.css` and `apps/web/src/styles.css`:
the teal scale (`brand-*`), `bg-surface`, `text-body`. Text and fills under
white text use `brand-700` or darker; lighter teals are decoration. Breakpoints:
576, 768, 992, 1200 and 1408 px. Sections get 72px of vertical space
(`--section-space`).

## Type

`text-display`, `text-h1`… are the starter's utilities; the site's section
titles use `SectionTitle` and the `h1`/`h2` classes in `styles.css`. Never a
raw size above `text-xl` on a heading.

## Sections and components

Every page except the home page sits in `PageShell` (the project's
`page-section`); the sections fade in with `Reveal`. Treatments are one
component each in `apps/web/src/components/care/`, text before the photo on
small screens. One call-to-action button style (`variant="cta"`).

## Imagery and icons

Photos of the therapist and treatments; grey placeholders stand in for the
seminar and drainage (`image-placeholder.tsx`). Icons: Lucide, `aria-hidden`.

## Do and don't

- Do use the tokens for every colour.
- Don't reword, restyle or reorder the client's content unasked.
- Never name the former workshop partner.

## Pages

`/` home, `/sonotherapie`, `/soins`, `/mon-parcours`, `/contact`: public;
`/sign-in`: app.
