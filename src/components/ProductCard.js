import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className='product-card'>
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  )
}

export default ProductCard
