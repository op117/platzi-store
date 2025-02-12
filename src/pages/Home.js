import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import axiosClient from '../api/axiosClient'
import '../styles/Home.css'

function Home() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.products.items)
  const [filters, setFilters] = useState({
    title: '',
    category: '',
    priceMin: '',
    priceMax: '',
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    dispatch(getProducts())
    fetchCategories()
  }, [dispatch])

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleResetFilters = () => {
    setFilters({ title: '', category: '', priceMin: '', priceMax: '' })
  }

  const filteredProducts = items.filter((product) => {
    return (
      (!filters.title ||
        product.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.category ||
        product.category?.id === Number(filters.category)) &&
      (!filters.priceMin || product.price >= Number(filters.priceMin)) &&
      (!filters.priceMax || product.price <= Number(filters.priceMax))
    )
  })

  return (
    <div>
      <h1>Products</h1>

      <div className='filters'>
        <input
          type='text'
          name='title'
          placeholder='Search by title'
          value={filters.title}
          onChange={handleFilterChange}
        />
        <select
          name='category'
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value=''>All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type='number'
          name='priceMin'
          placeholder='Min Price'
          value={filters.priceMin}
          onChange={handleFilterChange}
        />
        <input
          type='number'
          name='priceMax'
          placeholder='Max Price'
          value={filters.priceMax}
          onChange={handleFilterChange}
        />
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <div className='product-grid'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
