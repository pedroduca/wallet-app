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
    <View style={styles.backgroundContainer}>
      {shapes.map((shape, index) => (
        <View
          key={index}
          style={[
            styles.shape,
            { transform: [{ rotate: shape.rotation }], ...shape.position },
          ]}
        />
      ))}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  shape: {
    width: 349.21,
    height: 235.27,
    backgroundColor: colors.greyLight,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.2,
    position: 'absolute',
  },
})

export default BackgroundShapes
