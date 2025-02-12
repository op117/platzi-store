import axiosClient from './axiosClient'

export const fetchProducts = async () => {
  try {
    const response = await axiosClient.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
