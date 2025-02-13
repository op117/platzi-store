import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axiosClient'
import mockProducts from '../data/products.json'
import { setProducts } from '../store/productsSlice'

function useProducts() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts'))

    if (cachedProducts) {
      dispatch(setProducts(cachedProducts))
      setLoading(false)
    } else {
      axios
        .get('/products')
        .then((response) => {
          localStorage.setItem('cachedProducts', JSON.stringify(response.data))
          dispatch(setProducts(response.data))
        })
        .catch(() => {
          console.warn('API unavailable, loading local data')
          dispatch(setProducts(mockProducts))
        })
        .finally(() => setLoading(false))
    }
  }, [dispatch])

  return { products, loading }
}

export default useProducts
