/**
 * The shared design tokens for the app. Colors are defined once per scheme and
 * read through the consuming app's own `useTheme()` binding.
 *
 * The `web` branch of `Fonts` reads CSS custom properties, so a web consumer
 * has to import its own `global.css` where those properties are declared.
 */

import { Platform } from 'react-native'

/**
 * Palette notes
 *
 * - Brand hue is a soft coral (#F6A192). It is a pastel, so it is never a
 *   white-on-color fill: `primary` is the coral itself and `primaryForeground`
 *   is a deep cocoa that sits on top of it. `primaryText` is the deepened
 *   terracotta used wherever coral has to work as text or an icon.
 * - Dusty lavender is the accent, held back for emphasis that is not a state:
 *   ratings, featured listings, price callouts. It stays clear of every
 *   semantic hue, which coral cannot do — coral and red are neighbours.
 * - Neutrals are warm (a faint coral bias) rather than the blue-grey default,
 *   so the brand reads as calm instead of clashing.
 * - `*Soft` values are tinted surfaces (badges, chips, banners), `*Border` are
 *   their hairlines, and the base value is the accessible text/icon color on
 *   `background` or on its own `*Soft` surface.
 *
 * Every text/background pair below clears WCAG AA (4.5:1), with two deliberate
 * exceptions: `textTertiary` is a decorative/disabled tier — use `textSecondary`
 * for placeholders and any text that must be read — and `border` / `*Border` are
 * decorative hairlines. `borderStrong` is the one that clears 3:1 on every
 * surface, so use it whenever a border is the only thing marking a control
 * (input outlines, unfilled buttons).
 *
 * One consequence of a pastel brand: in light mode the coral fill only reaches
 * 1.97:1 against `background`, so its edge alone does not mark the control. Its
 * label does (6.71:1), which is what keeps a filled coral button identifiable —
 * but never ship a coral surface whose meaning depends on the fill being seen
 * (an icon-only button, a bare selected state). Give those a `borderStrong`
 * outline or a text label.
 */
export const Colors = {
  light: {
    /* Surfaces */
    background: '#FFFCFB',
    backgroundElement: '#F8F1EE',
    backgroundSelected: '#EFE5E1',
    border: '#E6DAD5',
    borderStrong: '#857370',
    overlay: 'rgba(38, 26, 22, 0.45)',

    /* Text */
    text: '#241C1A',
    textSecondary: '#6B5E5A',
    textTertiary: '#9C8C87',

    /* Brand — coral */
    primary: '#F6A192',
    primaryPressed: '#EE8B78',
    primaryForeground: '#4E2118',
    primaryText: '#B54428',
    primarySoft: '#FDEDE9',
    primaryBorder: '#F7CDC3',

    /* Accent — ratings, featured, price emphasis */
    accent: '#C2AADD',
    accentForeground: '#2F1F45',
    accentText: '#6B4899',
    accentSoft: '#F3EDFB',
    accentBorder: '#DCCCF0',

    /* State — available, verified, saved */
    success: '#2A7454',
    successSoft: '#E8F5EE',
    successBorder: '#B9DFC9',

    /* State — pending, expiring, partially occupied */
    warning: '#8A560B',
    warningSoft: '#FDF1DC',
    warningBorder: '#F0D9A8',

    /* State — full, rejected, destructive */
    danger: '#B3253B',
    dangerSoft: '#FDEAEE',
    dangerBorder: '#F5C2CC',
    dangerFill: '#B3253B',
    dangerFillForeground: '#FFFCFB',

    /* State — neutral information */
    info: '#0B5FAE',
    infoSoft: '#E9F2FD',
    infoBorder: '#BBD4F5',
  },
  dark: {
    /* Surfaces */
    background: '#14110F',
    backgroundElement: '#211C1A',
    backgroundSelected: '#2E2825',
    border: '#3A322F',
    borderStrong: '#8A7B76',
    overlay: 'rgba(0, 0, 0, 0.66)',

    /* Text */
    text: '#F0EAE7',
    textSecondary: '#B8ACA8',
    textTertiary: '#8A7C78',

    /* Brand — coral */
    primary: '#F6A192',
    primaryPressed: '#FAB6A9',
    primaryForeground: '#3F1811',
    primaryText: '#F8AC9C',
    primarySoft: '#33150F',
    primaryBorder: '#7A3428',

    /* Accent — ratings, featured, price emphasis */
    accent: '#C2AADD',
    accentForeground: '#22143A',
    accentText: '#D9C6F0',
    accentSoft: '#241A33',
    accentBorder: '#5A4380',

    /* State — available, verified, saved */
    success: '#5FD3A0',
    successSoft: '#102820',
    successBorder: '#2C6B4F',

    /* State — pending, expiring, partially occupied */
    warning: '#EFC078',
    warningSoft: '#2B2110',
    warningBorder: '#6E5426',

    /* State — full, rejected, destructive */
    danger: '#F2596E',
    dangerSoft: '#2C1218',
    dangerBorder: '#7A2437',
    dangerFill: '#C9314A',
    dangerFillForeground: '#FFFCFB',

    /* State — neutral information */
    info: '#8FC2FF',
    infoSoft: '#101F35',
    infoBorder: '#2C5680',
  },
} as const

export type ColorScheme = keyof typeof Colors
export type Theme = (typeof Colors)[ColorScheme]
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

const DMSans = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semiBold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
} as const

export const Fonts = Platform.select({
  ios: {
    sans: DMSans,
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: DMSans,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: {
      regular: 'var(--font-display)',
      medium: 'var(--font-display)',
      semiBold: 'var(--font-display)',
      bold: 'var(--font-display)',
    },
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 800
