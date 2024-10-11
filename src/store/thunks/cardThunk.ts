import { AppDispatch } from '../store'
import { APIBase } from '@/api'
import { addCard, setCards, setLoading } from '../slices/cardSlice'

export const registerCard =
  (cardData: {
    number: string
    cvv: string
    name: string
    expiryDate: string
    type: string
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
  } catch (error) {
    console.error('Erro ao buscar os cartões:', error)
  }
}
