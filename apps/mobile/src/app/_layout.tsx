import '@/global.css'

import { Stack, ThemeProvider } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react'

import { NavigationThemes } from '@/constants/navigation-theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useTheme } from '@/hooks/use-theme'

export default function RootLayout() {
  const scheme = useColorScheme()
  const theme = useTheme()

  useEffect(() => {
    // The native root view sits behind the stack, so it has to be painted too or
    // it shows through as white during pushes and orientation changes.
    SystemUI.setBackgroundColorAsync(theme.background)
  }, [theme.background])

  return (
    <ThemeProvider value={scheme === 'dark' ? NavigationThemes.dark : NavigationThemes.light}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: theme.background } }}>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style='auto' />
    </ThemeProvider>
  )
}
