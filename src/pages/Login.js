import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosClient.post('/auth/login', formData)
      dispatch(loginSuccess(response.data))
      setMessage('Login successful!')
      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      setMessage(
        'Error: ' + (error.response?.data?.message || 'Invalid credentials.')
      )
    }
  }

  return (
    <div className='auth-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
