import { createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser) return []
    const storedCart = localStorage.getItem(`cart_${storedUser.email}`)
    return storedCart ? JSON.parse(storedCart) : []
  } catch {
    return []
  }
}

const saveCartToLocalStorage = (cart) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      localStorage.setItem(`cart_${storedUser.email}`, JSON.stringify(cart))
    }
  } catch (error) {
    console.error('Failed to save cart:', error)
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
    clearCart: () => {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        localStorage.removeItem(`cart_${storedUser.email}`)
      }
      return []
    },
    logoutClearCart: () => {
      localStorage.removeItem(
        `cart_${JSON.parse(localStorage.getItem('user'))?.email}`
      )
      return []
    },
  },
})

export const { addToCart, removeFromCart, clearCart, logoutClearCart } =
  cartSlice.actions
export default cartSlice.reducer
