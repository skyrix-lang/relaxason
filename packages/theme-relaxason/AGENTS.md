# packages/theme-relaxason

The Relaxa'Son brand: CSS variables only (`src/theme.css`). The teal scale
(`--brand-*`) is the source; the other tokens pick from it. `--brand-700` and
darker pass WCAG AA as text and under white text; the lighter steps are for
decoration only. Check a new colour pair's contrast (4.5:1) before using it.

Besides colours, `src/theme.css` sets the type and layout tokens that
`packages/ui/src/styles.css` turns into `text-h1`…, `page-container`,
`page-section` and `prose-width`: `--font-heading` (the body font, Source
Sans 3), `--heading-weight` (700), `--heading-tracking` (none),
`--content-width` (76rem: the previous site's 1152px column plus the
container's gutters), `--prose-width` (65ch) and `--section-space` (6rem).
Change them only when asked, and update `docs/design.md`. `--font-display`
(Josefin Sans) is only the site's name in the navbar.
