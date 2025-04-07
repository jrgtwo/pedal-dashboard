import { Link } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'
import { useEffect } from 'react'

const Header = () => {
  const user_status = useLoginStore((state) => state.user_status)

  useEffect(() => {
    console.log('===>', user_status)
  }, [user_status])
  return (
    <header role="header"
      className="mt-20 flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-4xl font-extrabold">Pedal Dashboard</h1>
        <p>Layout and save your dream pedalboard</p>
      </Link>
      {
        user_status === LOGIN_STATES.LOGGED_IN
          ? <Link to="/logout">Logout</Link>
          : <Link to="/login">Login</Link>
      }
    </header >
  )
}

export { Header }
