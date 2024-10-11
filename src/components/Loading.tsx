import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Icon, IconsType } from './Icons/Icon'
import { colors } from '@/theme'

const LoadingScreen = () => {
  const iconScale = useRef(new Animated.Value(1)).current
  const shapeScales = [
    useRef(new Animated.Value(1)).current, // Shape 1
    useRef(new Animated.Value(1)).current, // Shape 2
  ]

  useEffect(() => {
    // Animação de escala do ícone
    const scaleAnimation = Animated.sequence([
      Animated.timing(iconScale, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
    ])
    console.log('scaleAnimation:', scaleAnimation)

    // Animação de bounce para os shapes de fundo
    const shapeAnimations = shapeScales.map((scale, index) =>
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ])
    )

    console.log('shapeAnimations:', shapeAnimations)

    // Iniciar as animações em paralelo
    const combinedAnimations = Animated.parallel([
      scaleAnimation,
      ...shapeAnimations,
    ])

    console.log('combinedAnimations:', combinedAnimations)

    combinedAnimations.start()

    // Repetir as animações indefinidamente para um efeito contínuo
    // útil para o usuário perceber que a aplicação não travou
    const loop = () => {
      combinedAnimations.reset()
      combinedAnimations.start(() => loop())
    }
    loop()

    return () => {
      // Limpar animações ao desmontar o componente
      iconScale.stopAnimation()
      shapeScales.forEach((scale) => scale.stopAnimation())
    }
  }, [iconScale, shapeScales])

  const iconAnimatedStyle = {
    transform: [{ scale: iconScale }],
  }

  const animatedShapeStyles = [
    {
      transform: [
        { scale: shapeScales[0] },
        { rotate: '-39.93deg' }, // Rotação estática para Shape 1
      ],
    },
    {
      transform: [
        { scale: shapeScales[1] },
        { rotate: '144.57deg' }, // Rotação estática para Shape 2
      ],
    },
  ]

  return (
    <View style={styles.container}>
      {/* Shapes de fundo animados */}
      <Animated.View
        style={[styles.shape, animatedShapeStyles[0], styles.shape1]}
      />
      <Animated.View
        style={[styles.shape, animatedShapeStyles[1], styles.shape2]}
      />

      {/* Ícone animado */}
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <Icon
          name={'WalletIcon' as IconsType}
          color={colors.white} // Cor fixa para evitar erros TODO: Entender melhor  troca de cores
          width="75"
          height="75"
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shape: {
    backgroundColor: colors.greyLight,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 235.27,
    opacity: 0.2,
    position: 'absolute',
    width: 349.21,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  shape1: {
    top: '82%',
    left: '38%',
    rotate: '-39.93deg',
  },
  shape2: {
    top: '-11%',
    right: '34%',
    rotate: '144.57deg',
    position: 'absolute',
  },
  iconContainer: {
    zIndex: 1,
  },
})

export default LoadingScreen
