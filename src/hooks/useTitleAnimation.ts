import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

const useTitleAnimation = (currentView: string) => {
  const bounceAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let toValue = 0

    if (currentView === 'input') {
      toValue = -20
    } else if (currentView === 'success') {
      toValue = 10
    } else {
      toValue = 30
    }

    Animated.spring(bounceAnim, {
      toValue,
      friction: 1,
      useNativeDriver: true,
    }).start()
  }, [currentView, bounceAnim])

  return bounceAnim
}

export default useTitleAnimation
