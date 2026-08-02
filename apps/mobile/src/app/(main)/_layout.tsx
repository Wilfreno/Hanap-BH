import '@/global.css'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Fragment } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks/use-theme'
import Toast from 'react-native-toast-message'
export default function Layout() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Fragment>
      <Toast />
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
    </Fragment>
  )
}
