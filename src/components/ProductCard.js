import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const placeholderImage = '/assets/no_image_available.svg'

  let imageUrl = placeholderImage

  if (Array.isArray(product.images) && product.images.length > 0) {
    let rawImage = product.images[0]

    if (typeof rawImage === 'string') {
      try {
        imageUrl = JSON.parse(rawImage)
      } catch (error) {
        imageUrl = rawImage.replace(/^"|"$/g, '')
      }
    }
  }

  console.log('Product:', product)
  console.log('Final Image URL:', imageUrl)

  return (
    <div className='product-card'>
      <img src={imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  )
}

export default ProductCard
