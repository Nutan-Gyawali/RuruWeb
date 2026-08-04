/**
 * Matcha Theme (retinted: emerald)
 *
 * Own copy of Astryx's Matcha theme, retinted from earthy olive to a
 * vivid jewel-toned emerald so the accent actually pops instead of
 * blending into the ink. Structural relationships (which role sits at
 * which lightness step) are kept as designed — only the hue changed.
 * Core palette: emerald-900 #064e3b, emerald-600 #059669, emerald-200 #a7f3d0
 * Heading swapped from Playwrite US Trad (handwriting, too informal for
 * a civic/community org) to DM Serif Display — same type family as the
 * DM Sans body, so it pairs natively instead of being a random serif.
 */

import {defineTheme, defineSyntaxTheme} from '@astryxdesign/core/theme';
import {matchaIconRegistry} from './icons';

/** Matcha syntax palette — earthy greens and warm tones. */
const matchaSyntax = defineSyntaxTheme({
  name: 'xds-matcha',
  tokens: {
    keyword: ['#5a6b2a', '#a8bf6a'],
    string: ['#2e6b4a', '#7bc49e'],
    comment: ['#707E46', '#707E46'],
    number: ['#8c6b30', '#d4b870'],
    function: ['#3a5e8c', '#7ba8d4'],
    type: ['#6b4a8c', '#b08ed4'],
    variable: ['#3E481D', '#C0CBA9'],
    operator: ['#707E46', '#94a468'],
    constant: ['#8c6b30', '#d4b870'],
    tag: ['#8c3a3a', '#d47a7a'],
    attribute: ['#7c5e3a', '#c4a882'],
    property: ['#3a7c6b', '#70c4b0'],
    punctuation: ['#707E46', '#5a6440'],
    background: ['#F0F0E0', '#1a1c14'],
  },
});

export const matchaTheme = defineTheme({
  name: 'matcha',

  typography: {
    // base 16 / ratio 1.25 — aligned with the other themes' geometric scale.
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'DM Sans',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    heading: {
      family: 'DM Serif Display',
      fallbacks: 'Georgia, "Times New Roman", Times, serif',
    },
    code: {
      family: 'JetBrains Mono',
      fallbacks: '"SF Mono", Monaco, Consolas, monospace',
    },
  },

  motion: {fast: 125, medium: 300, slow: 700, ratio: 0.75},

  syntax: matchaSyntax,

  tokens: {
    // =========================================================================
    // Colors — earthy matcha palette
    // Core: #3E481D, #707E46, #C0CBA9, #F0F0E0, #FFFFFF
    // =========================================================================

    // Core semantic
    '--color-accent': ['#059669', '#34d399'],
    '--color-accent-muted': ['#0596691a', '#34d39920'],
    '--color-neutral': ['#064e3b0F', '#a7f3d01A'],
    '--color-background-surface': ['#FFFFFF', '#0a120f'],
    '--color-background-body': ['#f2faf6', '#070b09'],
    '--color-overlay': ['#064e3b80', '#064e3bCC'],
    '--color-overlay-hover': ['#064e3b0D', '#a7f3d00D'],
    '--color-overlay-pressed': ['#064e3b1A', '#a7f3d01A'],
    '--color-background-muted': ['#ecfdf5', '#102019'],

    // Text
    '--color-text-primary': ['#064e3b', '#d1fae5'],
    '--color-text-secondary': ['#047857', '#6ee7b7'],
    '--color-text-disabled': ['#a7f3d0', '#245542'],
    '--color-text-accent': ['#059669', '#34d399'],
    '--color-on-dark': '#FFFFFF',
    '--color-on-light': '#064e3b',
    '--color-on-accent': ['#FFFFFF', '#052e22'],
    '--color-on-success': ['#FFFFFF', '#052e22'],
    '--color-on-error': ['#FFFFFF', '#052e22'],
    '--color-on-warning': ['#3E2F00', '#3E2F00'],

    // Icon
    '--color-icon-accent': ['#059669', '#34d399'],
    '--color-icon-primary': ['#064e3b', '#d1fae5'],
    '--color-icon-secondary': ['#047857', '#6ee7b7'],
    '--color-icon-disabled': ['#a7f3d0', '#245542'],

    // Surface variants
    '--color-background-card': ['#FFFFFF', '#0e1a15'],
    '--color-background-popover': ['#FFFFFF', '#0e1a15'],
    '--color-background-inverted': ['#064e3b', '#d1fae5'],

    // Status / Sentiment
    '--color-success': ['#059669', '#34d399'],
    '--color-success-muted': ['#05966920', '#34d39920'],
    '--color-error': ['#DC2626', '#f87171'],
    '--color-error-muted': ['#DC262620', '#f8717120'],
    '--color-warning': ['#D97706', '#fbbf24'],
    '--color-warning-muted': ['#D9770620', '#fbbf2420'],

    // Border
    // Soft mint borders (default + emphasized/card) in light mode.
    '--color-border': ['#d7ecdf', '#a7f3d01A'],
    '--color-border-emphasized': ['#a3d9bd', '#245542'],

    // Effects
    '--color-skeleton': ['#a7f3d0', '#245542'],
    '--color-shadow': ['#064e3b1A', '#0000004D'],
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
    '--color-background-gray': ['#05966933', '#5a644033'],
    '--color-border-gray': ['#059669', '#059669'],
    '--color-icon-gray': ['#047857', '#6ee7b7'],
    '--color-text-gray': ['#064e3b', '#d1fae5'],

    // Categorical — Green
    '--color-background-green': ['#05966933', '#34d39933'],
    '--color-border-green': ['#059669', '#34d399'],
    '--color-icon-green': ['#059669', '#34d399'],
    '--color-text-green': ['#047857', '#6ee7b7'],

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
    '--color-background-red': ['#FD000033', '#ff5c5c33'],
    '--color-border-red': ['#FD0000', '#ff5c5c'],
    '--color-icon-red': ['#FD0000', '#ff5c5c'],
    '--color-text-red': ['#cc0000', '#ff7a7a'],

    // Categorical — Teal
    '--color-background-teal': ['#2e6b5a33', '#5ab89833'],
    '--color-border-teal': ['#2e6b5a', '#5ab898'],
    '--color-icon-teal': ['#2e6b5a', '#5ab898'],
    '--color-text-teal': ['#245546', '#6ccaaa'],

    // Categorical — Yellow
    '--color-background-yellow': ['#FFB60033', '#ffc94033'],
    '--color-border-yellow': ['#FFB600', '#ffc940'],
    '--color-icon-yellow': ['#FFB600', '#ffc940'],
    '--color-text-yellow': ['#cc9200', '#ffd960'],

    // =========================================================================
    // Spacing
    // =========================================================================
    '--spacing-0-5': '3px',
    '--spacing-1': '6px',
    '--spacing-1-5': '9px',
    '--spacing-2': '12px',
    '--spacing-3': '18px',
    '--spacing-4': '24px',
    '--spacing-5': '30px',
    '--spacing-6': '36px',
    '--spacing-7': '42px',
    '--spacing-8': '48px',
    '--spacing-9': '54px',
    '--spacing-10': '60px',
    '--spacing-11': '66px',
    '--spacing-12': '72px',

    // =========================================================================
    // Radius — soft and rounded
    // =========================================================================
    '--radius-inner': '6px',
    '--radius-element': '12px',
    '--radius-container': '18px',
    '--radius-page': '42px',

    // No explicit --font-size-* overrides — font sizes come from
    // typography.scale above, keeping the scale the single source of truth.

    // =========================================================================
    // Element sizes
    // =========================================================================
    '--size-element-sm': '36px',
    '--size-element-md': '40px',
    '--size-element-lg': '44px',

    // =========================================================================
    // Shadows
    // =========================================================================
    '--shadow-low': '0 2px 4px #064e3b0D, 0 4px 8px #064e3b1A',
    '--shadow-med': '0 2px 4px #064e3b0D, 0 4px 12px #064e3b1A',
    '--shadow-high': '0 4px 6px #064e3b1A, 0 12px 24px #064e3b26',
    '--shadow-inset-hover': 'inset 0px 0px 0px 2px #05966930',
    '--shadow-inset-selected': 'inset 0px 0px 0px 2px #05966950',
    '--shadow-inset-success': 'inset 0px 0px 0px 2px #05966950',
    '--shadow-inset-warning': 'inset 0px 0px 0px 2px #FFB60050',
    '--shadow-inset-error': 'inset 0px 0px 0px 2px #FD000050',
  },

  components: {
    button: {
      base: {
        borderRadius: 'var(--radius-full)',
      },
    },
    card: {
      base: {
        borderRadius: 'var(--radius-page)',
        padding: 'var(--spacing-3)',
      },
    },
    section: {
      base: {
        padding: 'var(--spacing-3)',
      },
    },
  },

  icons: matchaIconRegistry,
});
