// Card.tsx
import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { DEVICE_WIDTH } from '@utils/device'

import { colors, typography } from '../theme'

export type CardProps = {
  type: 'green' | 'black'
  name: string
  cardNumber: string
  validity: string
  onPress: () => void
}

const Card = ({ type, name, cardNumber, validity, onPress }: CardProps) => {
  const maskCardNumber = (cardNumber: string) => {
    const splitNumber = cardNumber.split('')
    return splitNumber.map((char, index) =>
      index < splitNumber.length - 4 ? '*' : char
    )
  }
  const cardNumberMasked = maskCardNumber(cardNumber)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
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
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    width: DEVICE_WIDTH * 0.8,
    height: 180,
    paddingLeft: 10,
    paddingVertical: 25,
    borderRadius: 16,
    alignItems: 'flex-start',
  },
  cardInfoContainer: {
    padding: 5,
    gap: 3,
  },
  title: {
    marginBottom: 34,
  },
  greenCard: {
    backgroundColor: colors.greenLight,
    color: colors.black,
  },
  blackCard: {
    backgroundColor: colors.black,
    color: colors.white,
  },
  textBlack: {
    color: colors.black,
  },
  textWhite: {
    color: colors.white,
  },
})

export default Card
