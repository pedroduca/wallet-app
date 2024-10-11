import React, { memo } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from 'react-native'

import { colors } from '../theme'
import BackgroundShapes from './Background'

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
    <BackgroundShapes>
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={statusBarColor} />
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
      </SafeAreaView>
    </BackgroundShapes>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
})

export default memo(Container)
