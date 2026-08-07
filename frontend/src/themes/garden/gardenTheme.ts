/**
 * Garden Theme ("Cream Garden")
 *
 * Own copy of Astryx's Chocolate theme, retinted from cocoa/caramel to the
 * "Cream Garden" direction: a warm-gray-and-cream ground, monochrome green
 * as the whole identity — no orange. The neutral ramp (ground, card, ink)
 * was pulled off the Organic design system's tan/orange-tinted OKLCH
 * ramps and desaturated toward a neutral warm gray, so it stays soft
 * without reading as a second, competing warm hue against the green.
 * Green does double duty at two distinct tones rather than one, because a
 * single green can't serve both jobs at once:
 *   - --color-accent / --color-text-accent — a moderate, readable-as-text
 *     green (~4:1 on the ground). Used for inline text, links, icon
 *     glyphs, borders — anywhere green sits *as* text/UI ink.
 *   - --color-accent-fill — a genuinely light, bright leaf green. Used for
 *     big surfaces (buttons, panels, the notice card) paired with dark ink
 *     text via --color-on-accent-fill. This is the tone that reads "light
 *     green" — lightening --color-accent itself to match would have made
 *     it fail contrast everywhere it's used as text.
 *   - --color-accent-secondary — a deep forest green, the second voice
 *     (was terracotta; replaced so the palette stays strictly green-on-
 *     green rather than green+orange). Dark enough to carry light text
 *     directly, so it doesn't need its own -fill split.
 * Ground #f5f3ea, card #e7e5d7, ink #1f1e17.
 * Radii are pushed further than Chocolate's — over-rounded containers,
 * pill buttons/inputs — to match Cream Garden's soft-card language.
 * Headings swapped to Baloo 2 (a rounded, chunky display face with real
 * Devanagari coverage, unlike the Arabic-script "Baloo Bhaijaan" family)
 * over Mukta for body — both pair natively with this bilingual site's
 * Nepali content, unlike Fraunces/Albert Sans which don't cover Devanagari.
 */

import {defineTheme, defineSyntaxTheme} from '@astryxdesign/core/theme';
import type {TokenName, TokenValue} from '@astryxdesign/core/theme';
import {gardenIconRegistry} from './icons';

/** Garden syntax palette — two tones of green, warm ink comments. */
const gardenSyntax = defineSyntaxTheme({
  name: 'xds-garden',
  tokens: {
    keyword: ['#2f4d1f', '#8fc25a'],
    string: ['#52832f', '#9ed46c'],
    comment: ['#7d7b65', '#7d7b65'],
    number: ['#3d5a28', '#a8d47c'],
    function: ['#3a5e8c', '#7ba8d4'],
    type: ['#6b4a8c', '#b08ed4'],
    variable: ['#1f1e17', '#eeece0'],
    operator: ['#7d7b65', '#c2c0ac'],
    constant: ['#3d5a28', '#a8d47c'],
    tag: ['#8c3a3a', '#d47a7a'],
    attribute: ['#2f4d1f', '#8fc25a'],
    property: ['#52832f', '#9ed46c'],
    punctuation: ['#7d7b65', '#5b5946'],
    background: ['#fbfaf5', '#1c1b16'],
  },
});

export const gardenTheme = defineTheme({
  name: 'garden',

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'Mukta',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    heading: {
      family: 'Baloo 2',
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    code: {
      family: 'JetBrains Mono',
      fallbacks: '"SF Mono", Monaco, Consolas, monospace',
    },
  },

  motion: {fast: 125, medium: 300, slow: 700, ratio: 0.75},

  syntax: gardenSyntax,

  tokens: {
    // =========================================================================
    // Colors — Cream Garden palette, monochrome green
    // Ground #f5f3ea, card #e7e5d7, ink #1f1e17 — a desaturated warm-gray
    // neutral ramp (shifted off the original Organic system's tan/orange
    // undertone, which read as "creamy orange" once paired with green),
    // green text/UI tone #52832f, light-green fill #8bc34a,
    // forest green (second voice) #2f4d1f
    // =========================================================================

    // Core semantic — the readable-as-text green (~4:1 on the cream
    // ground). Used for inline text, links, borders, icon glyphs.
    '--color-accent': ['#52832f', '#9ed46c'],
    '--color-accent-muted': ['#52832f1a', '#9ed46c20'],
    '--color-neutral': ['#52832f0F', '#eeece01A'],
    '--color-background-surface': ['#fbfaf5', '#1c1b16'],
    '--color-background-body': ['#f5f3ea', '#1a1915'],
    '--color-overlay': ['#1f1e1780', '#0d0c0aCC'],
    '--color-overlay-hover': ['#1f1e170D', '#eeece00D'],
    '--color-overlay-pressed': ['#1f1e171A', '#eeece01A'],
    '--color-background-muted': ['#eeece0', '#242219'],

    // Light-green fill — a genuinely light, bright leaf green for big
    // surfaces (buttons, panels, the notice card), paired with dark ink
    // text via --color-on-accent-fill. Not part of Astryx's default token
    // set: --color-accent already carries the "readable as text" job, so
    // lightening it to also read as "light green" on big surfaces would
    // have broken it everywhere it's used as text/icon color.
    '--color-accent-fill': ['#8bc34a', '#a9d67c'],
    '--color-on-accent-fill': ['#1c2b10', '#132009'],

    // Text
    '--color-text-primary': ['#1f1e17', '#f6f5ec'],
    '--color-text-secondary': ['#605e4d', '#b8b6a0'],
    '--color-text-disabled': ['#b6b49e', '#605e4d'],
    '--color-text-accent': ['#52832f', '#9ed46c'],
    '--color-on-dark': '#f6f5ec',
    '--color-on-light': '#1f1e17',
    '--color-on-accent': ['#f5faf0', '#12200a'],
    '--color-on-success': ['#ffffff', '#14210a'],
    '--color-on-error': ['#ffffff', '#2e0a0a'],
    '--color-on-warning': ['#402310', '#402310'],

    // Icon
    '--color-icon-accent': ['#52832f', '#9ed46c'],
    '--color-icon-primary': ['#1f1e17', '#f6f5ec'],
    '--color-icon-secondary': ['#605e4d', '#b8b6a0'],
    '--color-icon-disabled': ['#b6b49e', '#605e4d'],

    // Surface variants
    '--color-background-card': ['#e7e5d7', '#242219'],
    '--color-background-popover': ['#fbfaf5', '#242219'],
    '--color-background-inverted': ['#1f1e17', '#f6f5ec'],

    // Solid pastel green — for tags/icon fills that need more presence than
    // the ~10%-alpha --color-accent-muted wash gives against the tan card
    // background. Parity with --color-background-accent-secondary below.
    '--color-background-accent': ['#e6f1d8', '#2c3b1c33'],

    // Second voice — deep forest green (was terracotta; replaced so the
    // palette stays strictly green, no orange). Dark enough to carry light
    // text directly, so unlike the primary it doesn't need its own -fill
    // token. Not part of Astryx's default token set; a genuine second
    // brand accent, used as its own role (tags, the Community/second-CTA
    // panel, icon variety) rather than a status color. (Aliased in
    // index.css under the `sage` name from the first pass — now literally
    // accurate again, since the hue landed back on a green.)
    '--color-accent-secondary': ['#2f4d1f', '#8fc25a'],
    '--color-accent-secondary-muted': ['#2f4d1f1a', '#8fc25a20'],
    '--color-on-accent-secondary': ['#eef5e4', '#152b0a'],
    '--color-text-accent-secondary': ['#2f4d1f', '#cfe0bd'],
    '--color-icon-accent-secondary': ['#2f4d1f', '#cfe0bd'],
    '--color-background-accent-secondary': ['#e4ecda', '#1c2b1233'],

    // Status / Sentiment
    '--color-success': ['#4f7a1f', '#96bf2a'],
    '--color-success-muted': ['#4f7a1f20', '#96bf2a20'],
    '--color-error': ['#c23a2e', '#ff7a6a'],
    '--color-error-muted': ['#c23a2e20', '#ff7a6a20'],
    '--color-warning': ['#c2860f', '#ffc940'],
    '--color-warning-muted': ['#c2860f20', '#ffc94020'],

    // Border
    '--color-border': ['#dad8c8', '#39372c'],
    '--color-border-emphasized': ['#c2c0ac', '#5b5946'],

    // Effects
    '--color-skeleton': ['#dad8c8', '#5b5946'],
    '--color-shadow': ['#1f1e171A', '#0000004D'],
    '--color-tint-hover': ['black', 'white'],

    // Categorical — Blue
    '--color-background-blue': ['#3a5e8c33', '#3a5e8c33'],
    '--color-border-blue': ['#3a5e8c', '#7ba8d4'],
    '--color-icon-blue': ['#3a5e8c', '#7ba8d4'],
    '--color-text-blue': ['#2e4a6e', '#8dbce0'],

    // Categorical — Cyan
    '--color-background-cyan': ['#3a7c7c33', '#3a7c7c33'],
    '--color-border-cyan': ['#3a7c7c', '#70c4c4'],
    '--color-icon-cyan': ['#3a7c7c', '#70c4c4'],
    '--color-text-cyan': ['#2e6060', '#82d4d4'],

    // Categorical — Gray
    '--color-background-gray': ['#7d7b6533', '#5f5d4a33'],
    '--color-border-gray': ['#7d7b65', '#7d7b65'],
    '--color-icon-gray': ['#7d7b65', '#c2c0ac'],
    '--color-text-gray': ['#1f1e17', '#eeece0'],

    // Categorical — Green (kept distinct from the sage brand accent above —
    // this is the generic status/badge green, sage is a brand role)
    '--color-background-green': ['#4f7a1f33', '#96bf2a33'],
    '--color-border-green': ['#4f7a1f', '#96bf2a'],
    '--color-icon-green': ['#4f7a1f', '#96bf2a'],
    '--color-text-green': ['#3d5f17', '#a8d43a'],

    // Categorical — Orange
    '--color-background-orange': ['#c4762033', '#d4903a33'],
    '--color-border-orange': ['#c47620', '#d4903a'],
    '--color-icon-orange': ['#c47620', '#d4903a'],
    '--color-text-orange': ['#a06018', '#e0a04a'],

    // Categorical — Pink
    '--color-background-pink': ['#c44a7033', '#e07a9a33'],
    '--color-border-pink': ['#c44a70', '#e07a9a'],
    '--color-icon-pink': ['#c44a70', '#e07a9a'],
    '--color-text-pink': ['#a03a5a', '#f08aaa'],

    // Categorical — Purple
    '--color-background-purple': ['#6b4a8c33', '#b08ed433'],
    '--color-border-purple': ['#6b4a8c', '#b08ed4'],
    '--color-icon-purple': ['#6b4a8c', '#b08ed4'],
    '--color-text-purple': ['#553a70', '#c0a0e0'],

    // Categorical — Red
    '--color-background-red': ['#c23a2e33', '#ff7a6a33'],
    '--color-border-red': ['#c23a2e', '#ff7a6a'],
    '--color-icon-red': ['#c23a2e', '#ff7a6a'],
    '--color-text-red': ['#96271d', '#ff9a8e'],

    // Categorical — Teal
    '--color-background-teal': ['#2e6b5a33', '#5ab89833'],
    '--color-border-teal': ['#2e6b5a', '#5ab898'],
    '--color-icon-teal': ['#2e6b5a', '#5ab898'],
    '--color-text-teal': ['#245546', '#6ccaaa'],

    // Categorical — Yellow
    '--color-background-yellow': ['#c2860f33', '#ffc94033'],
    '--color-border-yellow': ['#c2860f', '#ffc940'],
    '--color-icon-yellow': ['#c2860f', '#ffc940'],
    '--color-text-yellow': ['#8f6208', '#ffd960'],

    // =========================================================================
    // Radius — over-rounded, growing into pills (Cream Garden's soft-card look)
    // =========================================================================
    '--radius-none': '0.125rem',
    '--radius-inner': '0.5rem',
    '--radius-element': '0.875rem',
    '--radius-container': '1.25rem',
    '--radius-page': '2rem',
    '--radius-full': '9999px',

    // =========================================================================
    // Shadows — soft, ink-tinted (no hard offsets; lifts read as air, not edge)
    // =========================================================================
    '--shadow-low': '0 2px 4px #1f1e170D, 0 4px 8px #1f1e171A',
    '--shadow-med': '0 4px 10px #1f1e170D, 0 8px 20px #1f1e171A',
    '--shadow-high': '0 8px 16px #1f1e171A, 0 20px 40px #1f1e1726',
    '--shadow-inset-hover': 'inset 0px 0px 0px 2px #52832f4D',
    '--shadow-inset-selected': 'inset 0px 0px 0px 2px #52832f80',
    '--shadow-inset-success': 'inset 0px 0px 0px 2px #4f7a1f50',
    '--shadow-inset-warning': 'inset 0px 0px 0px 2px #c2860f50',
    '--shadow-inset-error': 'inset 0px 0px 0px 2px #c23a2e50',

    // Cast: --color-accent-secondary etc. are our own sage-brand additions,
    // outside Astryx's built-in TokenName union — still valid CSS custom
    // properties that `astryx theme build` emits verbatim (verified in
    // garden.css), just not typed by the framework.
  } as Partial<Record<TokenName, TokenValue>>,

  components: {
    button: {
      base: {
        borderRadius: 'var(--radius-full)',
      },
      'variant:secondary': {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-emphasized)',
      },
    },

    card: {
      base: {
        padding: 'var(--spacing-4)',
      },
    },

    section: {
      base: {
        padding: 'var(--spacing-4)',
      },
    },
  },

  icons: gardenIconRegistry,
});
