import { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@/store/index'
import { getCards } from '@/store/thunks/cardThunk'
import { colors, typography } from '@/theme'

import Header from '@/components/Header'
import SubHeader from '@/components/SubHeader'
import AnimatedCard from '@/components/AnimatedCard'
import Button from '@/components/Button'
import LoadingScreen from '@/components/Loading'
import {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated'

const { height: screenHeight } = Dimensions.get('window')

const MyCards = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  const { cards, isLoading } = useSelector((state: RootState) => state.card)

  const selectedCardIndex = useSharedValue<number | null>(null)

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const subHeaderAnim = useRef(new Animated.Value(-50)).current
  useEffect(() => {
    dispatch(getCards())
    animateSubHeader()
  }, [dispatch])

  const animateSubHeader = () => {
    Animated.timing(subHeaderAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  useAnimatedReaction(
    () => selectedCardIndex.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setSelectedIndex)(currentValue)
      }
    }
  )

  const calculateButtonPosition = () => {
    if (selectedIndex === null) {
      return undefined
    }
    return screenHeight / 2 + 100
  }

  const buttonPositionY = calculateButtonPosition()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header
        backgroundColor={colors.white}
        title="Wallet Test"
        onRightPress={() => navigation.push('Home', { showInputs: true })}
        onBackPress={() => navigation.goBack()}
      />
      <SubHeader title="Meus cartões" animationValue={subHeaderAnim} />

      <View style={styles.cardsContainer}>
        {cards.length > 0 ? (
          <>
            {cards.map((item, index) => (
              <AnimatedCard
                key={item.id}
                type={item.type}
                name={item.name}
                cardNumber={item.number}
                validity={item.expiryDate}
                index={index}
                selectedCardIndex={selectedCardIndex}
              />
            ))}
            {selectedIndex !== null && (
              <View
                style={[
                  styles.payButtonContainer,
                  { paddingTop: buttonPositionY - 50 },
                ]}
              >
                <Button
                  type="primary"
                  title="pagar com este cartão"
                  onPress={() => console.log('Pagamento com cartão')}
                  style={[
                    styles.payButton,
                    {
                      top: buttonPositionY,
                      paddingTop: buttonPositionY + 300,
                    },
                  ]}
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsText}>Sem cartões para usar</Text>
          </View>
        )}
      </View>
      <View style={[styles.bottomOverlay, { height: insets.bottom }]} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueDark,
    flex: 1,
  },
  cardsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },

  noCardsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noCardsText: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
  },
  payButtonContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  payButton: {
    alignSelf: 'flex-end',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(20, 41, 149, 0.5)',
  },
})

export default MyCards
