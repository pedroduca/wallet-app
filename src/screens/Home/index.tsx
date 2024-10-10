import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Animated, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { colors, typography } from '@/theme'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Header from '@/components/Header'
import Card from '@/components/Card'

import CardForm from './CardForm'

const Home = (params) => {
  const navigation = useNavigation()

  const [showInputs, setShowInputs] = useState()

  const [showNextView, setShowNextView] = useState(false)

  const bounceAnim = useRef(new Animated.Value(0)).current

  const cards = useSelector((state: RootState) => state.card.cards)
  const lastCard = cards[cards.length - 1]

  const handleRegisterCardPress = () => {
    setShowInputs(true)
    Animated.spring(bounceAnim, {
      toValue: -50,
      friction: 2,
      useNativeDriver: true,
    }).start()
  }

  const handleMyCardsPress = () => {
    navigation.navigate('MyCards')
  }

  useEffect(() => {
    if (showNextView) {
      Animated.spring(bounceAnim, {
        toValue: -30,
        friction: 2,
        useNativeDriver: true,
      }).start()
    }
  }, [showNextView])

  useFocusEffect(
    React.useCallback(() => {
      setShowInputs(params.route.params?.showInputs)
    }, [params.route.params?.showInputs])
  )

  return (
    <Container>
      <View style={styles.walletHomeContainer}>
        <View style={styles.contentContainer}>
          <Animated.Text
            style={[styles.title, { transform: [{ translateY: bounceAnim }] }]}
          >
            Wallet Test
          </Animated.Text>
          {showInputs ? (
            showNextView ? (
              // TODO: Mover para um arquivo separado
              <>
                <Header
                  title="cadastro"
                  onBackPress={() => setShowNextView(false)}
                />
                <View style={styles.cardContainer}>
                  <Text style={styles.cardMessage}>
                    cartão cadastrado com sucesso
                  </Text>
                  <Card
                    type={lastCard.type}
                    name={lastCard.name}
                    cardNumber={lastCard.number}
                    validity={lastCard.expiryDate}
                  />
                </View>
                <View style={{ width: '100%', padding: 16 }}>
                  <Button
                    title="Avançar"
                    onPress={(() => setShowNextView(false), handleMyCardsPress)}
                  />
                </View>
              </>
            ) : (
              <>
                <Header
                  title="cadastro"
                  onBackPress={() => setShowInputs(false)}
                />
                <CardForm setShowNextView={setShowNextView} />
              </>
            )
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title="Meus Cartões"
                onPress={handleMyCardsPress}
                variant="primary"
              />
              <Button
                title="Cadastrar Cartão"
                onPress={handleRegisterCardPress}
                variant="secondary"
              />
            </View>
          )}
        </View>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 16,
    gap: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    color: colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletHomeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blueDark,
  },
  inputContainer: {
    width: '100%',
    gap: 10,
  },
  cardMessage: {
    ...typography.h4,
    color: colors.white,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
})

export default Home
