import React, { memo } from 'react'
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'

import { colors } from '../theme'
import BackgroundShapes from './Background'

interface IContainerProps {
  children: React.ReactNode
  backgroundColor?: string
  paddingHorizontal?: number
}

const Container = ({
  children,
  backgroundColor = colors.blueDark,
  paddingHorizontal = 20,
}: IContainerProps): JSX.Element => {
  return (
    <BackgroundShapes>
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
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
