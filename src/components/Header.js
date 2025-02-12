import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'

function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/cart'>Cart</Link>
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
          <li>
            <button onClick={() => dispatch(logout())}>
              Logout ({user.name})
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header
