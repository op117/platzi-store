import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../store/cartSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Cart.css'

const categoryImages = {
  Clothes: '/assets/Clothes.png',
  Electronics: '/assets/Electronics.png',
  Furniture: '/assets/Furniture.png',
  Shoes: '/assets/Shoes.png',
  Miscellaneous: '/assets/Miscellaneous.png',
  Grocery: '/assets/Grocery.png',
}

function Cart() {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState({})
  const [imageUrls, setImageUrls] = useState({})
  const placeholderImage = '/assets/no_image_available.svg'

  useEffect(() => {
    const updatedImageUrls = {}

    cart.forEach((item) => {
      const categoryKey =
        item?.category?.name && categoryImages[item.category.name]
          ? categoryImages[item.category.name]
          : placeholderImage

      if (Array.isArray(item.images) && item.images.length > 0) {
        const img = new Image()
        img.src = item.images[0].replace(/^"|"$/g, '')
        img.onload = () =>
          setImageUrls((prev) => ({ ...prev, [item.id]: img.src }))
        img.onerror = () =>
          setImageUrls((prev) => ({ ...prev, [item.id]: categoryKey }))
      } else {
        updatedImageUrls[item.id] = categoryKey
      }
    })

    setImageUrls((prev) => ({ ...prev, ...updatedImageUrls }))
  }, [cart])

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
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <img
                src={imageUrls[item.id] || placeholderImage}
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
          <div className='buttons-container'>
            <button
              className='clear-cart-btn'
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <button
              className='checkout-btn'
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
