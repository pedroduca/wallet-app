import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { cardTypes } from '@/utils/cardTypes'
import { maskCardNumber, maskCVV, handleDateChange } from '@/utils/mask'
import { registerCard } from '@/store/thunks/cardThunk'

interface FormState {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

interface ICardForm {
  setShowNextView: () => void
}

const CardForm = ({ setShowNextView }: ICardForm) => {
  const dispatch = useDispatch()

  const [cvvMask, setCvvMask] = useState('')
  const [form, setForm] = useState<FormState>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  })

  const handleInputChange = (field: keyof FormState, value: string) => {
    let maskedValue = value

    if (field === 'cardNumber') {
      maskedValue = maskCardNumber(value)
    } else if (field === 'expiryDate') {
      maskedValue = handleDateChange(value)
    } else if (field === 'cvv') {
      setForm((prev) => ({ ...prev, cvv: value }))
      maskedValue = maskCVV(value)
      setCvvMask(maskedValue)
      return
    }

    setForm((prev) => ({ ...prev, [field]: maskedValue }))
  }

  const isFormComplete =
    form.cardNumber.length === 19 &&
    form.expiryDate.length === 5 &&
    form.cvv.length === 3 &&
    form.cardHolder.length >= 2

  const getRandomType = () => {
    const randomIndex = Math.floor(Math.random() * cardTypes.length)
    return cardTypes[randomIndex]
  }

  const handleSubmit = async () => {
    if (isFormComplete) {
      const cardData = {
        name: form.cardHolder,
        number: form.cardNumber,
        cvv: form.cvv,
        expiryDate: form.expiryDate,
        type: getRandomType(),
      }

      await dispatch(registerCard(cardData)).finally(() => {
        setShowNextView(true)
        setForm({})
      })
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
        label="número do cartão"
        iconLeft="CameraIcon"
        value={form.cardNumber}
        inputProps={{
          keyboardType: 'number-pad',
          onChangeText: (cardNumber) =>
            handleInputChange('cardNumber', cardNumber),
          maxLength: 19,
        }}
      />
      <Input
        label="nome do titular do cartão"
        value={form.cardHolder}
        inputProps={{
          onChangeText: (name) => handleInputChange('cardHolder', name),
        }}
      />
      <View style={styles.row}>
        <Input
          label="vencimento"
          placeholder="00/00"
          value={form.expiryDate}
          inputProps={{
            onChangeText: (date) => handleInputChange('expiryDate', date),
            keyboardType: 'number-pad',
            maxLength: 5,
          }}
        />
        <Input
          label="código de segurança"
          placeholder="***"
          value={cvvMask}
          inputProps={{
            onChangeText: (code) => handleInputChange('cvv', code),
            keyboardType: 'number-pad',
            maxLength: 3,
          }}
        />
      </View>
      <Button
        title="Avançar"
        onPress={handleSubmit}
        disabled={!isFormComplete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 10,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
})

export default CardForm
