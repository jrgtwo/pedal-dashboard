import { Link } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'

const Header = () => {
  const user_status = useLoginStore((state) => state.user_status)

  return (
    <header role="header"
      className="mt-20 flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-5xl font-[Lilita_One]" style={{ "textShadow": "1px 1px rgba(255,255,255,0.9),2px 2px rgba(0,0,0,0.9)" }}>Pedal Dashboard</h1>
        <p className="text-2-xl font-[Bebas_Neue]">Layout and save your dream pedalboard</p>
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
