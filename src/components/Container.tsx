import React, { memo } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View } from 'react-native'

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
    <View style={[styles.container, { backgroundColor }]}>
      <BackgroundShapes />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingHorizontal },
          ]}
          style={{ backgroundColor: 'transparent' }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
})

export default memo(Container)
