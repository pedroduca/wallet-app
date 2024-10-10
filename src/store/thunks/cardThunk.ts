import { AppDispatch } from '../store'
import { APIBase } from '@/api'
import { setCards, setLoading, setError } from '../slices/cardSlice'

export const registerCard =
  (cardData: {
    number: number
    cvv: number
    name: string
    expiryDate: string
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await APIBase.post('/cards', cardData)
      const newCard = response.data

      dispatch(addCard(newCard))
    } catch (error) {
      console.error('Erro ao cadastrar cartão', error)
    }
  }

export const getCards = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading())
    const response = await APIBase.get('/cards')
    const cards = response.data

    dispatch(setCards(cards))
  } catch (error: any) {
    console.error('Erro ao buscar os cartões:', error)
  }
}
