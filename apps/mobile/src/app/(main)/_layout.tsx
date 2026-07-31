import '@/global.css'

import { Stack, ThemeProvider } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react'
import { useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { NavigationThemes } from '@/constants/navigation-theme'
import { useTheme } from '@/hooks/use-theme'
import AuthProvider from '@/providers/AuthProvider'
import Toast from "react-native-toast-message"
export default function Layout() {
  const scheme = useColorScheme()
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background)
  }, [theme.background])

  return (
    <AuthProvider>
      <ThemeProvider value={scheme === 'dark' ? NavigationThemes.dark : NavigationThemes.light}>
        <Toast/>
        <View style={{ flex: 1 }}>
          <View style={{ height: insets.top, backgroundColor: theme.primary }} />
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: theme.background },
              headerStyle: { backgroundColor: theme.backgroundElement },
            }}
          >
            <Stack.Screen
              name='index'
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </View>
        <StatusBar style='dark' />
      </ThemeProvider>
    </AuthProvider>
  )
}
