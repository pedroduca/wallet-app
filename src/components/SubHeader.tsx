import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, typography } from '@/theme'

interface SubHeaderProps {
  title: string
}

const SubHeader = ({ title }: SubHeaderProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </View>
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
