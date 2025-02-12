import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../store/cartSlice'
import { useState } from 'react'
import '../styles/Cart.css'

function Cart() {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const placeholderImage = '/assets/no_image_available.svg'
  const [expandedItems, setExpandedItems] = useState({})

  if (!user) {
    return (
      <p>
        Please <a href='/login'>log in</a> to view your cart.
      </p>
    )
  }

  const toggleDetails = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className='cart-page'>
      <h1>{user.name}'s Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <img
                src={item.images?.[0] || placeholderImage}
                alt={item.title}
                onError={(e) => (e.target.src = placeholderImage)}
              />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <button onClick={() => toggleDetails(item.id)}>
                  {expandedItems[item.id] ? 'Hide Details' : 'View Details'}
                </button>
                {expandedItems[item.id] && (
                  <p className='product-description'>{item.description}</p>
                )}
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <h2 className='cart-total'>Total: ${totalPrice.toFixed(2)}</h2>
          <button
            className='clear-cart-btn'
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
