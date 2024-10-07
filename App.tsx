import React, { useCallback } from 'react'
import { Provider } from 'react-redux'
import * as SplashScreen from 'expo-splash-screen'
import {
  PTSans_400Regular,
  PTSans_700Bold,
  useFonts,
} from '@expo-google-fonts/pt-sans'
import { View } from 'react-native'

import Routes from './src/routes'
import { store } from './src/store'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </View>
  )
}
