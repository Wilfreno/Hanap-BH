import { Fonts, type ThemeColor } from '@repo/themes/theme'
import { Text, type TextProps } from 'react-native'

import { useTheme } from '@/hooks/use-theme'

const variants = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '600' },
  subtitle: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
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
      style={[{ color: theme[color], fontFamily: Fonts.sans }, variants[variant], style]}
      {...rest}
    />
  )
}
