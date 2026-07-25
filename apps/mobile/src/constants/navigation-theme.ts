/**
 * The navigator keeps its own theme, so the stack, headers and back buttons are
 * painted separately from the screens. These map the six colors it asks for onto
 * the shared palette, and inherit `fonts` from the defaults it ships with.
 */

import { Colors, type ColorScheme } from '@repo/themes/theme'
import { DarkTheme, DefaultTheme } from 'expo-router'

function toNavigationTheme(base: ReactNavigation.Theme, scheme: ColorScheme): ReactNavigation.Theme {
  const colors = Colors[scheme]

  return {
    ...base,
    colors: {
      // Header tint and the back button: the coral fill is a pastel and would be
      // unreadable as text, so this is the deepened `primaryText` instead.
      primary: colors.primaryText,
      background: colors.background,
      card: colors.backgroundElement,
      text: colors.text,
      border: colors.border,
      notification: colors.dangerFill,
    },
  }
}

export const NavigationThemes = {
  light: toNavigationTheme(DefaultTheme, 'light'),
  dark: toNavigationTheme(DarkTheme, 'dark'),
} as const
