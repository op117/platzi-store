import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import '../styles/ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const placeholderImage = '/assets/no_image_available.svg'
  const [imageUrl, setImageUrl] = useState(placeholderImage)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/products/${id}`)
        setProduct(response.data)
      } catch (err) {
        setError('Error fetching product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product?.images?.length > 0) {
      const img = new Image()
      img.src = product.images[0].replace(/^"|"$/g, '')
      img.onload = () => setImageUrl(img.src)
      img.onerror = () => setImageUrl(placeholderImage)
    } else {
      setImageUrl(placeholderImage)
    }
  }, [product])

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='product-detail'>
      <img src={imageUrl} alt={product?.title} />
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <p>
        <strong>Price:</strong> ${product?.price}
      </p>
      <button onClick={handleAddToCart} disabled={addedToCart}>
        {addedToCart ? 'Added!' : 'Add to Cart'}
      </button>
      {addedToCart && <p className='cart-message'>Product added to cart!</p>}
    </div>
  )
}

export default ProductDetail
