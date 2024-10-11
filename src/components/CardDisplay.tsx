import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, typography } from '../theme'

export type CardDisplayProps = {
  type: 'green' | 'black'
  name: string
  cardNumber: string
  validity: string
}

const CardDisplay = ({
  type,
  name,
  cardNumber,
  validity,
}: CardDisplayProps) => {
  const maskCardNumber = (cardNumber: string) => {
    const splitNumber = cardNumber.split('')
    return splitNumber
      .map((char, idx) => (idx < splitNumber.length - 4 ? '*' : char))
      .join('')
  }
  const cardNumberMasked = maskCardNumber(cardNumber)

  return (
    <View
      style={[
        styles.card,
        type === 'green' ? styles.greenCard : styles.blackCard,
      ]}
    >
      <View style={styles.cardInfoContainer}>
        <Text
          style={[
            typography.h5,
            styles.title,
            type === 'green' ? styles.textBlack : styles.textWhite,
          ]}
        >
          {type === 'green' ? 'Green Card' : 'Black Card'}
        </Text>
        <Text
          style={[
            typography.p,
            type === 'green' ? styles.textBlack : styles.textWhite,
          ]}
        >
          {name}
        </Text>
        <Text
          style={[
            typography.pSmall,
            type === 'green' ? styles.textBlack : styles.textWhite,
          ]}
        >
          {cardNumberMasked}
        </Text>
        <Text
          style={[
            typography.pSmall,
            type === 'green' ? styles.textBlack : styles.textWhite,
          ]}
        >
          Validade {validity}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  blackCard: {
    backgroundColor: colors.black,
    color: colors.white,
  },
  card: {
    width: 300,
    height: 180,
    paddingLeft: 10,
    paddingVertical: 25,
    borderRadius: 16,
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
  cardInfoContainer: {
    gap: 3,
    padding: 5,
  },
  greenCard: {
    backgroundColor: colors.greenLight,
    color: colors.black,
  },
  textBlack: {
    color: colors.black,
  },
  textWhite: {
    color: colors.white,
  },
  title: {
    marginBottom: 34,
  },
})

export default CardDisplay
