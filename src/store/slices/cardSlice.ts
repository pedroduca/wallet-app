import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Card {
  id: string
  name: string
  number: string
  expiryDate: string
  type: string
}

interface CardState {
  cards: Card[]
  loading: boolean
  error: string | null
}

const initialState: CardState = {
  cards: [],
  loading: false,
  error: null,
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload)
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state) => {
      state.loading = true
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { addCard, setCards, setLoading, setError } = cardSlice.actions
export default cardSlice.reducer
