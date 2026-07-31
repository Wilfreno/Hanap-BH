import { ThemedText } from '@/components/themed/themed-text'
import { ThemedView } from '@/components/themed/themed-view'

export default function Home() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>This is Home</ThemedText>
    </ThemedView>
  )
}
