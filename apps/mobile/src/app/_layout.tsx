import AuthLoading from '@/components/loading/AuthLoading'
import { NavigationThemes } from '@/constants/navigation-theme'
import { useTheme } from '@/hooks/use-theme'
import AuthProvider, { useAuth } from '@/providers/AuthProvider'
import { AuthStatus } from '@repo/enums/auth.enums'
import { Stack, ThemeProvider } from 'expo-router'
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

export default function RootLayout() {
  const scheme = useColorScheme()
  const theme = useTheme()

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background)
  }, [theme.background])

  return (
    <ThemeProvider value={scheme === 'dark' ? NavigationThemes.dark : NavigationThemes.light}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  )
}

function RootNavigator() {
  const { status } = useAuth()

  if (status === AuthStatus.LOADING) return <AuthLoading />

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === AuthStatus.UNAUTHENTICATED}>
        <Stack.Screen name='(auth)' />
      </Stack.Protected>

      <Stack.Protected guard={status === AuthStatus.AUTHENTICATED}>
        <Stack.Screen name='(main)' />
      </Stack.Protected>
    </Stack>
  )
}
