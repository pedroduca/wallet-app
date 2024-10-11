import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import { colors, typography } from '@/theme'
import Button from '@/components/Button'
import CardDisplay from '@/components/CardDisplay'
import { getCards } from '@/store/thunks/cardThunk'

const CardRegistered = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { cards } = useSelector((state: RootState) => state.card)
  const lastCard: Card | undefined =
    cards.length > 0 ? cards[cards.length - 1] : undefined

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(getCards())
    }
  }, [cards, dispatch])

  const handleMyCardsPress = () => {
    navigation.navigate('MyCards')
  }

  return (
    <>
      <View style={styles.cardContainer}>
        <Text style={styles.cardMessage}>cartão cadastrado com sucesso</Text>
        <CardDisplay
          type={lastCard.type}
          name={lastCard.name}
          cardNumber={lastCard.number}
          validity={lastCard.expiryDate}
        />
        <Button title="Avançar" onPress={handleMyCardsPress} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 30,
  },
  cardMessage: {
    ...typography.h4,
    color: colors.white,
    textAlign: 'center',
  },
})

export default CardRegistered
