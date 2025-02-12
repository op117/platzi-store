import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ProductCard({ product }) {
  const placeholderImage = '/assets/no_image_available.svg'
  const [imageUrl, setImageUrl] = useState(placeholderImage)

  useEffect(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      const img = new Image()
      img.src = product.images[0].replace(/^"|"$/g, '')
      img.onload = () => setImageUrl(img.src)
      img.onerror = () => setImageUrl(placeholderImage)
    }
  }, [product.images])

  return (
    <div className='product-card'>
      <img className='product-image' src={imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`} className='view-details'>
        View Details
      </Link>
    </div>
  )
}

export default ProductCard
