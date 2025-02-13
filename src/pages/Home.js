import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import useProducts from '../hooks/useProducts'
import '../styles/Home.css'

function Home() {
  const { products, loading } = useProducts()
  const [filters, setFilters] = useState({
    title: '',
    category: '',
    priceMin: '',
    priceMax: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const categories = useSelector((state) => state.products.categories)

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters({ title: '', category: '', priceMin: '', priceMax: '' })
    setCurrentPage(1)
  }

  if (loading) return <p>Loading products...</p>

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.title ||
        product.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.category ||
        product.category?.name.toLowerCase() ===
          filters.category.toLowerCase()) &&
      (!filters.priceMin || product.price >= Number(filters.priceMin)) &&
      (!filters.priceMax || product.price <= Number(filters.priceMax))
    )
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
          {categories?.map((cat) => (
            <option key={cat.name} value={cat.name}>
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
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
