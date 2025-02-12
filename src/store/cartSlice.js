import { createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
    return []
  }
}

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.find((i) => i.id === item.id)
      if (!existingItem) {
        state.push(item)
        saveCartToLocalStorage(state)
      }
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload)
      saveCartToLocalStorage(updatedCart)
      return updatedCart
    },
    clearCart: (state) => {
      saveCartToLocalStorage([])
      return []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
