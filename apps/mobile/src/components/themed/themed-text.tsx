import { Fonts, type ThemeColor } from '@repo/themes/theme'
import { Platform, Text, type TextProps, type TextStyle } from 'react-native'

import { useTheme } from '@/hooks/use-theme'

/**
 * On native the weight lives in the family name, and passing `fontWeight` on
 * top of an already-bold face makes Android synthesise a second, heavier bold.
 * Web serves one family, so there the numeric weight is what selects the cut.
 */
const weight = (value: TextStyle['fontWeight']) => (Platform.OS === 'web' ? { fontWeight: value } : null)

const variants = {
  title: { fontSize: 28, lineHeight: 34, fontFamily: Fonts.sans.semiBold, ...weight('600') },
  subtitle: { fontSize: 18, lineHeight: 24, fontFamily: Fonts.sans.semiBold, ...weight('600') },
  body: { fontSize: 16, lineHeight: 24, fontFamily: Fonts.sans.regular, ...weight('400') },
  caption: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.sans.regular, ...weight('400') },
} as const

export type ThemedTextProps = TextProps & {
  /**
   * Any text token. Defaults to `text` — reach for `textSecondary` rather than
   * `textTertiary` for anything that has to be read.
   */
  color?: ThemeColor
  variant?: keyof typeof variants
}

export function ThemedText({ color = 'text', variant = 'body', style, ...rest }: ThemedTextProps) {
  const theme = useTheme()

  return (
    <Text
      style={[{ color: theme[color] }, variants[variant], style]}
      {...rest}
    />
  )
}
