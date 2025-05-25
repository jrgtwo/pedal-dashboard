import { Link } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'

const Header = () => {
  const user_status = useLoginStore((state) => state.user_status)

  return (
    <header role="header"
      className="mt-20 flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-5xl font-[Exile]" style={{ "textShadow": "0.5px 0.5px rgba(255,255,255,0.9),1px 1px rgba(0,0,0,0.9),1.5px 1.5px rgba(255,255,255,0.8),2px 2px rgba(0,0,0,0.8),2.5px 2.55px rgba(255,255,255,0.7),3px 3px rgba(0,0,0,0.7), 3.5px 3.5px rgba(255,255,255,0.6),4px 4px rgba(0,0,0,0.6), 4.5px 4.5px rgba(255,255,255,0.5),5px 5px rgba(0,0,0,0.5), 5.5px 5.5px rgba(255,255,255,0.4),6px 6px rgba(0,0,0,0.4),6.5px 6.5px rgba(255,255,255,0.3),7px 7px rgba(0,0,0,0.3),7.5px 7.5px rgba(255,255,255,0.2),8px 8px rgba(0,0,0,0.2), 8.5px 8.5px rgba(255,255,255,0.1),9px 9px rgba(0,0,0,0.1)" }}>Pedal Dashboard</h1>
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
