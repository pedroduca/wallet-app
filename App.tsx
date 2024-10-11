import React, { useCallback } from 'react'
import { Provider } from 'react-redux'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  PTSans_400Regular,
  PTSans_700Bold,
  useFonts,
} from '@expo-google-fonts/pt-sans'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
