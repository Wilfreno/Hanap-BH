import { Spacing } from '@repo/themes/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function Home() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, gap: Spacing.two, padding: Spacing.three }}>
        <ThemedText variant='title'>This is Home</ThemedText>
      </SafeAreaView>
    </ThemedView>
  )
}
