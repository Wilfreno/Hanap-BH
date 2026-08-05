import '@/global.css'
import { Tabs } from 'expo-router'
import { Map, MapPinHouse, Search, User } from 'lucide-react-native'
import { ColorValue, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Fragment } from 'react/jsx-runtime'
export default function Tabslayout() {
  const insets = useSafeAreaInsets()
  const mainTabs = [
    {
      name: 'nearby',
      title: 'Nearby',
      icon: ({ color, size }: { color: ColorValue; size: number }) => <MapPinHouse color={color} size={size} />,
    },
    {
      name: 'map',
      title: 'Map',
      icon: ({ color, size }: { color: ColorValue; size: number }) => <Map color={color} size={size} />,
    },
    {
      name: 'search',
      title: 'Search',
      icon: ({ color, size }: { color: ColorValue; size: number }) => <Search color={color} size={size} />,
    },
    {
      name: 'profile',
      title: 'Profile',
      icon: ({ color, size }: { color: ColorValue; size: number }) => <User color={color} size={size} />,
    },
  ]

  return (
    <Fragment>
      <View style={{ height: insets.top }} />
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#FFFFFF' } }} >
        {mainTabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon({ color, size, focused }) {
                return tab.icon({ color, size })
              },
            
            }}
          />
        ))}
      </Tabs>
    </Fragment>
  )
}
