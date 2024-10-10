import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, IconsType } from './Icons/Icon'

import { colors } from '@/theme'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Icon
        name={'WalletIcon' as IconsType}
        color={colors.white}
        width="24"
        height="24"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingScreen
