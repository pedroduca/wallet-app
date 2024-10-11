import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../theme'

interface IBackgroundShapesProps {
  children: React.ReactNode
}

const BackgroundShapes = ({ children }: IBackgroundShapesProps) => {
  const shapes = [
    { rotation: '-39.93deg', position: { top: '82%', left: '38%' } },
    { rotation: '144.57deg', position: { top: '-11%', right: '34%' } },
  ]

  return (
    <View style={styles.container}>
      {shapes.map((shape, index) => (
        <View
          key={index}
          style={[
            styles.shape,
            {
              transform: [{ rotate: shape.rotation }],
              ...shape.position,
            },
          ]}
        />
      ))}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.blueDark,
  },
  shape: {
    backgroundColor: colors.greyLight,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 235.27,
    opacity: 0.2,
    position: 'absolute',
    width: 349.21,
  },
  contentContainer: {
    flex: 1,
  },
})

export default BackgroundShapes
