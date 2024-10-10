import React from 'react'
import { Animated, View, StyleSheet, Text } from 'react-native'
import { colors, typography } from '@/theme'
import HeaderButton from '@/components/HeaderButton'

interface IHeaderProps {
  title?: string
  onBackPress: () => void
  backgroundColor?: string
  onRightPress?: () => void
}

const Header = ({
  title,
  onBackPress,
  backgroundColor,
  onRightPress,
}: IHeaderProps) => {
  return (
    <Animated.View style={[styles.headerContainer, { backgroundColor }]}>
      <HeaderButton icon="ArrowLeftIcon" onPress={onBackPress} />
      <Text style={styles.headerTitle}>{title}</Text>
      {onRightPress ? (
        <HeaderButton icon="PlusIcon" onPress={onRightPress} />
      ) : (
        <View style={styles.headerRightSpace}></View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.blueLight,
    textAlign: 'center',
  },
  headerRightSpace: {
    width: 32,
  },
})

export default Header
