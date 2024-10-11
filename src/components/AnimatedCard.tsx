import React, { useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import CardDisplay from './CardDisplay'

const { height: screenHeight } = Dimensions.get('window')

export type AnimatedCardProps = {
  type: 'green' | 'black'
  name: string
  cardNumber: string
  validity: string
  index: number
  selectedCardIndex: Animated.SharedValue<number | null>
}

const AnimatedCard = ({
  type,
  name,
  cardNumber,
  validity,
  index,
  selectedCardIndex,
}: AnimatedCardProps) => {
  const translateY = useSharedValue(index * -20)
  const opacity = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    zIndex: selectedCardIndex.value === index ? 1 : 0,
  }))

  useEffect(() => {
    if (selectedCardIndex.value === null) {
      // Estado inicial
      if (index === 0) {
        // Cartão de trás
        translateY.value = withTiming(0, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        })
      } else if (index === 1) {
        // Cartão da frente deslocado 60px para baixo
        translateY.value = withTiming(60, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        })
      } else {
        // Outros cartões (se houver)
        translateY.value = withTiming(index * 60, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        })
      }
      opacity.value = withTiming(1, { duration: 500 })
    } else if (selectedCardIndex.value === index) {
      // Cartão selecionado move para cima
      translateY.value = withTiming(-40, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      })
      opacity.value = withTiming(1, { duration: 500 })
    } else {
      // Cartões não selecionados descem para o rodapé, mantendo parte visível
      translateY.value = withTiming(screenHeight / 2.4, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      })
      opacity.value = withTiming(0.9, { duration: 200 })
    }
  }, [selectedCardIndex.value])

  const tapGesture = Gesture.Tap().onEnd(() => {
    if (selectedCardIndex.value === index) {
      selectedCardIndex.value = null
    } else {
      selectedCardIndex.value = index
    }
  })

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <CardDisplay
          type={type}
          name={name}
          cardNumber={cardNumber}
          validity={validity}
        />
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 180,
    // marginBottom: -100,
    paddingLeft: 10,
    paddingVertical: 25,
    borderRadius: 16,
    position: 'absolute',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
})

export default AnimatedCard
