import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, View } from 'react-native'

import { useTheme } from '@/hooks/use-theme'

export default function AuthLoading() {
  const theme = useTheme()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('@/assets/images/favicon.png')} style={{ width: 150, height: 150 }} contentFit='contain' />
      <ActivityIndicator size='small' color={theme.primaryForeground} style={{ marginTop: 24 }} />
      <StatusBar style='dark' />
    </View>
  )
}
