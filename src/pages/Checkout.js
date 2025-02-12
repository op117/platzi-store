import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

function Checkout() {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (!user) {
    return (
      <p>
        Please <a href='/login'>log in</a> to proceed to checkout.
      </p>
    )
  }

  const handleCheckout = () => {
    const fakeOrder = {
      id: Math.floor(Math.random() * 1000000),
      user: user.email,
      items: cart,
      total: cart.reduce((total, item) => total + item.price, 0),
      date: new Date().toISOString(),
    }

    console.log('Order placed:', fakeOrder)
    localStorage.setItem(`order_${fakeOrder.id}`, JSON.stringify(fakeOrder))

    dispatch(clearCart())
    setOrderPlaced(true)

    setTimeout(() => navigate('/'), 3000)
  }

  return (
    <div className='checkout-page'>
      <h1>Checkout</h1>
      {orderPlaced ? (
        <p className='success-message'>
          Thank you for your purchase! Redirecting to home...
        </p>
      ) : (
        <div>
          <h2>Order Summary</h2>
          <ul className='order-list'>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price}
              </li>
            ))}
          </ul>
          <h3>
            Total: $
            {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </h3>
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      )}
    </div>
  )
}

export default Checkout
