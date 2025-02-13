import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartSlice'
import axios from '../api/axiosClient'
import '../styles/ProductDetail.css'

const categoryImages = {
  Clothes: '/assets/Clothes.png',
  Electronics: '/assets/Electronics.png',
  Furniture: '/assets/Furniture.png',
  Shoes: '/assets/Shoes.png',
  Miscellaneous: '/assets/Miscellaneous.png',
  Grocery: '/assets/Grocery.png',
}

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [product, setProduct] = useState(null)
  const [imageUrl, setImageUrl] = useState('/assets/no_image_available.svg')

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((response) => {
        const productData = response.data
        setProduct(productData)

        const categoryKey =
          productData?.category?.name &&
          categoryImages[productData.category.name]
            ? categoryImages[productData.category.name]
            : '/assets/no_image_available.svg'

        if (
          Array.isArray(productData.images) &&
          productData.images.length > 0
        ) {
          const img = new Image()
          img.src = productData.images[0].replace(/^"|"$/g, '')
          img.onload = () => setImageUrl(img.src)
          img.onerror = () => setImageUrl(categoryKey)
        } else {
          setImageUrl(categoryKey)
        }
      })
      .catch((error) => console.error('Error fetching product details:', error))
  }, [id])

  // Проверяем, есть ли товар в корзине
  const isInCart = cart.some((item) => item.id === product?.id)

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id))
    } else {
      dispatch(addToCart(product))
    }
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className='product-detail'>
      <img
        className='product-detail-image'
        src={imageUrl}
        alt={product?.title || 'No Title'}
      />
      <h1>{product?.title || 'No Title'}</h1>
      <p>{product?.description || 'No description available.'}</p>
      <p>Price: ${product?.price || 'N/A'}</p>
      <button className='cart-action-btn' onClick={handleCartAction}>
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default ProductDetail
