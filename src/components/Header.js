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
          <li>
            <Link to='/cart'>
              Cart {cart.length > 0 ? `(${cart.length})` : ''}
            </Link>
          </li>
        </li>
        {cart.length > 0 && (
          <li>
            <Link to='/checkout'>Checkout</Link>
          </li>
        )}
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
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header
