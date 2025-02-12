import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'

function Home() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts())
    }
  }, [status, dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div>
      <h1>Products</h1>
      <div className='product-grid'>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
