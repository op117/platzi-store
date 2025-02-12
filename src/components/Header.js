import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const cart = useSelector((state) => state.cart)

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/cart'>Cart ({cart.length})</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
