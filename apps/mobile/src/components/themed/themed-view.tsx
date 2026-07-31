import { type ThemeColor } from '@repo/themes/theme'
import { View, type ViewProps } from 'react-native'

import { useTheme } from '@/hooks/use-theme'

export type ThemedViewProps = ViewProps & {
  /** Any surface token. Defaults to the screen ground. */
  color?: ThemeColor
}

export function ThemedView({ color = 'background', style, ...rest }: ThemedViewProps) {
  const theme = useTheme()

  return <View style={[{ backgroundColor: theme[color] }, style]} {...rest} />
}
