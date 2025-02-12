import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.find((i) => i.id === item.id)
      if (!existingItem) {
        state.push(item)
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
