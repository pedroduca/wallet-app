import { useCallback, useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors, typography } from '@/theme'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Header from '@/components/Header'
import CardForm from './CardForm'
import CardRegistered from './CardRegistered'
import useTitleAnimation from '@/hooks/useTitleAnimation'

const Home = () => {
  const navigation = useNavigation()

  const [currentView, setCurrentView] = useState<'home' | 'input' | 'success'>(
    'home'
  )

  const bounceAnim = useTitleAnimation(currentView)

  const handleRegisterCardPress = useCallback(() => {
    setCurrentView('input')
  }, [])

  return (
    <Container>
      {currentView === 'home' && (
        <View style={styles.walletHomeContainer}>
          <Animated.Text
            style={[styles.title, { transform: [{ translateY: bounceAnim }] }]}
          >
            Wallet Test
          </Animated.Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Meus Cartões"
              onPress={() => navigation.navigate('MyCards')}
              variant="primary"
            />
            <Button
              title="Cadastrar Cartão"
              onPress={handleRegisterCardPress}
              variant="secondary"
            />
          </View>
        </View>
      )}
      {(currentView === 'input' || currentView === 'success') && (
        <>
          <Header
            title="cadastro"
            onBackPress={() =>
              setCurrentView(currentView === 'input' ? 'home' : 'input')
            }
          />
          <View style={styles.contentContainer}>
            <Animated.Text
              style={[
                styles.title,
                { transform: [{ translateY: bounceAnim }] },
              ]}
            >
              Wallet Test
            </Animated.Text>
            {currentView === 'input' ? (
              <CardForm setShowNextView={() => setCurrentView('success')} />
            ) : (
              <CardRegistered setCurrentView={setCurrentView} />
            )}
          </View>
        </>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  walletHomeContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    ...typography.h1,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
    padding: 16,
  },
})

export default Home
