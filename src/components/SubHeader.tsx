import React from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { colors, typography } from '@/theme'

interface SubHeaderProps {
  title: string
  animationValue: Animated.Value
}

const SubHeader = ({ title, animationValue }: SubHeaderProps) => {
  const animatedStyle = {
    transform: [{ translateY: animationValue }],
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 190,
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 20,
  },
  title: {
    ...typography.h4,
    color: colors.blueLight,
  },
})

export default SubHeader
