import { useState } from 'react'
import axiosClient from '../api/axiosClient'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/150?img=3',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.post('/users', formData)
      setMessage('Registration successful! You can now log in.')
    } catch (error) {
      setMessage(
        'Error: ' +
          (error.response?.data?.message.join(', ') || 'Failed to register.')
      )
    }
  }

  return (
    <div className='auth-form'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type='text'
          name='avatar'
          placeholder='Avatar URL (optional)'
          value={formData.avatar}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
