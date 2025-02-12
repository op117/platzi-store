import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../store/cartSlice'

function Cart() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className='cart-page'>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <img
                src={item.images?.[0] || '/assets/no_image_available.png'}
                alt={item.title}
              />
              <div>
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  )
}

export default Cart
