# Enduro Solutions — website

Static marketing site for **Enduro Solutions** and **Enduro IQ**. Plain HTML + Tailwind,
built to a committed stylesheet and served by GitHub Pages. No runtime dependencies, no
build step in the deploy path.

Live domain: `endurosolutionstrade.com`

---

## Before you go live

**Nothing is blocking.** The site is complete and every contact path works with no accounts,
services or API keys. Deploy whenever you're ready.

### How contact works, and why there's no form

GitHub Pages serves static files only — it cannot run server code, so an HTML `<form>` has
nowhere to submit to. The usual fix is a third-party relay like [Formspree](https://formspree.io),
which needs an account and an endpoint ID pasted into the markup.

Rather than ship forms that silently fail until that's configured, each contact section is a
**direct-contact block**: a prominent `mailto:` link with a pre-filled subject line, a "Save
contact" vCard download, and a LinkedIn link. Zero setup, nothing to break mid-outreach, and
the pre-filled subject makes triage easier when replies land.

Subject lines by page:

| Page | Subject |
|---|---|
| `index.html` | Enduro IQ - conversation request |
| `laredo.html` | Pathways for Trade - Laredo |
| `partners.html` | Trade partner enquiry |

**If you'd rather have a real form later**, sign up at Formspree, then wrap the fields in
`<form action="https://formspree.io/f/YOUR_ID" method="POST">`. Keep the `mailto:` link
alongside it as a fallback. A Calendly link would drop into the same slot.

### Optional additions

- **Founder photo** — drop a square image at `assets/errol-rochester.jpg`, then uncomment the
  `<img>` already in place in the Founder section of `about.html`.
- **Phone number** — deliberately not published. Your resume lists `(803) 979-6159`; add it to
  the contact blocks and `assets/errol-rochester.vcf` if you want it public. Bear in mind a
  number on a public page attracts cold calls.

### Contact details currently published

- Email: `erochester@endurosolutionstrade.com`
- LinkedIn: `linkedin.com/in/errol-rochester-18350615a`

---

## Build

Requires Node (for the Tailwind CLI only). The generated CSS **is committed**, so you only
need this when you change markup or `src/input.css`.

```bash
npm install
npm run build      # writes assets/styles.css
npm run watch      # rebuild on change while editing
npm run serve      # http://localhost:8080
```

If you edit any `.html` and don't rerun `npm run build`, new Tailwind classes won't have CSS.

---

## Deploy to GitHub Pages

```bash
cd ~/enduro-site
git add -A && git commit -m "Update site"
gh repo create enduro-site --public --source=. --push   # first time only
git push                                                 # thereafter
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.

`CNAME` already contains `endurosolutionstrade.com`.

### DNS

At your registrar, for `endurosolutionstrade.com`:

| Type  | Host  | Value                 |
|-------|-------|-----------------------|
| A     | `@`   | `185.199.108.153`     |
| A     | `@`   | `185.199.109.153`     |
| A     | `@`   | `185.199.110.153`     |
| A     | `@`   | `185.199.111.153`     |
| CNAME | `www` | `<username>.github.io.` |

Then back in **Settings → Pages**, tick **Enforce HTTPS**. The certificate can take up to an
hour to issue — do this well before you start outreach, not the night before.

---

## Structure

```
index.html      Home — hero, corridor stats, problem, Enduro IQ, discovery band, contact
laredo.html     Pathways for Trade — the QR / badge-scan landing page
platform.html   Enduro IQ — six-step workflow, "what it is not", AI principles
corridor.html   U.S.–Mexico beachhead, Port of Laredo, staged geographic model
partners.html   Brokers, forwarders, institutions, data partners
about.html      Mission, brand architecture, founder, current stage
404.html        Not found

src/input.css       Tailwind source + @font-face + component classes
tailwind.config.js  Brand tokens
assets/             Logos, icons, fonts, QR, vCard, generated styles.css
```

Header and footer markup is duplicated across pages (no templating). If you change one,
change all of them — `grep` for `<!-- Header -->`.

---

## Brand

Values taken from `Enduro_Style Guide.pdf` — do not substitute approximations.

| Token | Hex | Notes |
|---|---|---|
| Ink | `#272A6A` | RGB 39 42 106 · CMYK 100 94 27 12 |
| Accent | `#5A5180` | RGB 90 81 128 · CMYK 74 71 25 9 |
| White | `#FFFFFF` | |
| Neutral | `#2B2B2B` | from the logo artwork |

Gradient: `linear-gradient(135deg, #272A6A, #5A5180)`

**Type:** Outfit (display) and Montserrat (body), self-hosted variable subsets in
`assets/fonts/`. No Google Fonts request at runtime.

**Intermediate palette steps** (`ink-300/400`, `accent-300/400`) were darkened from a naive
ramp so that every text colour clears WCAG AA (4.5:1) against **both** white and the
`ink-50` panel background. Don't lighten them without re-checking contrast.

### Logo assets

The supplied logos are **stacked portrait** (mark above wordmark, viewBox `1082 × 1228`) and
won't fit a header bar. These were derived by cropping the viewBox — the vector artwork is
untouched and pixel-exact:

| File | viewBox | Use |
|---|---|---|
| `mark-gradient.svg` / `mark-white.svg` | `0 0 1081 1081` | square ES monogram |
| `wordmark-gradient.svg` / `wordmark-white.svg` | `0 1146 1082.42 82` | "ENDURO SOLUTIONS" |
| `logo-gradient.svg` / `logo-white.svg` | full | original stacked lockup |

The horizontal header lockup is `mark` + `wordmark` side by side, both as `<img>` (kept as
separate documents so the SVG gradient IDs can't collide when both appear on a page).

`og-image.png` and `apple-touch-icon.png` are generated from the brand artwork, not redrawn.

---

## The QR code

`assets/qr-laredo.svg` encodes `https://endurosolutionstrade.com/laredo` — for your
badge, booth collateral and email signature.

> **Scan-test it with a phone before you send anything to print.** It was generated
> programmatically and has been checked structurally (29×29 modules, version 3, error
> correction M) but has not been scanned by a real device.

To regenerate after a URL change:

```bash
curl -o assets/qr-laredo.svg \
  "https://api.qrserver.com/v1/create-qr-code/?size=800x800&margin=8&ecc=M&format=svg&data=https%3A%2F%2Fendurosolutionstrade.com%2Flaredo"
```

---

## Editorial rules for this site

These come from `Enduro_Solutions_Enduro_IQ_Business_Plan_FINAL_v2.docx`. They exist because
the audience is trade professionals who will notice. Please keep to them when editing.

1. **No claimed institutional partnerships.** Government, university, port and industry
   relationships are "conversations," "introductions" or "prospective channels" until a
   written agreement exists. MileOne, LEDC, TAMIU, Laredo College and LMCA appear on this
   site **only** as factual event references and source citations — never as partners.
2. **Don't imply Enduro IQ is available.** It is in development. No demo, trial, pricing or
   sign-up language anywhere.
3. **No `Trust Score™`.** Say "explainable verification indicators." The only mention on the
   site is the disclaimer in `platform.html` stating it is *not* being marketed.
4. **No TAM/SAM/SOM figures.** The old `$68B / $9.5B / $150M` numbers are internal estimates
   pending validation and must not be published.
5. **Not a brokerage, forwarder or lender.** Those functions run through licensed partners.
6. **Every statistic carries a visible source note.** If there's no defensible source, don't
   publish the number.
7. **No investor content** — no raise, no financials.

Audit before deploying:

```bash
grep -rniE 'trust score|\bTAM\b|free trial|request a demo|pricing|sign up' *.html
grep -rniE 'mileone|LEDC|TAMIU|laredo college' *.html   # each hit must be factual
```

---

## Not touched

`~/trilink-hub` (the Next.js app) and `~/trilink-landing` / `trilinkglobaltrade.com` are
untouched and still running. Once this site is live, consider redirecting the old domain
here.
