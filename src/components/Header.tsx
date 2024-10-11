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
    alignItems: 'center',
    flexDirection: 'row',
    height: 66,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerRightSpace: {
    width: 32,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.blueLight,
    textAlign: 'center',
  },
})

export default Header
