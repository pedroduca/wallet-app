import React, { memo } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import Background from './Background'

import { IS_ANDROID, STATUSBAR_HEIGHT } from '../utils/device'
import { colors } from '../theme'

interface IContainerProps {
  children: React.ReactNode
  backgroundColor?: string
  statusBarColor?: string
  paddingHorizontal?: number
}

const Container = ({
  children,
  backgroundColor = colors.blueDark,
  statusBarColor = colors.blueDark,
  paddingHorizontal = 20,
}: IContainerProps): JSX.Element => {
  return (
    <Background>
      <StatusBar translucent backgroundColor={statusBarColor} />

      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: backgroundColor ? backgroundColor : 'transparent',
          },
        ]}
      />

      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingHorizontal },
        ]}
        style={{ backgroundColor }}
      >
        {children}
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: 'relative',
  },
  safeArea: {
    paddingTop: IS_ANDROID ? STATUSBAR_HEIGHT * 4 : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
})

export default memo(Container)
