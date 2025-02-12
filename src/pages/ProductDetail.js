import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const placeholderImage = '/assets/no_image_available.svg'

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const imageUrl =
    product.images?.length > 0
      ? product.images[0].replace(/^"|"$/g, '')
      : placeholderImage

  return (
    <div className='product-detail'>
      <img src={imageUrl} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  )
}

export default ProductDetail
