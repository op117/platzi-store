import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { logoutClearCart } from '../store/cartSlice'
import '../styles/Header.css'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const cart = useSelector((state) => state.cart)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(logoutClearCart())
  }

  return (
    <nav className='header'>
      <ul className='nav-links'>
        <li>
          <Link to='/'>Products</Link>
        </li>
        <li>
          <Link to='/cart'>Cart ({cart.length})</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        ) : (
          <li className='user-info'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header
