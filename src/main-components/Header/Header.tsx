import { Link } from 'react-router'
import { useLoginStore } from '../../store/login'

const Header = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  return (
    <header role="header"
      className="mt-20 flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-4xl font-extrabold">Pedal Dashboard</h1>
        <p>Layout and save your dream pedalboard</p>
      </Link>
      {
        isLoggedIn
          ? <span>IsLoggedIn</span>
          : <Link to="/login">Login</Link>
      }
    </header>
  )
}

export { Header }
