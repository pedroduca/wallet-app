import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../theme'

const Background = () => {
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
            shape.position,
            { transform: [{ rotate: shape.rotation }] },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
})

export default Background
