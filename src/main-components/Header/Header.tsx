import { Link } from 'react-router'

const Header = () => {

  return (
    <header role="header"
      className="mt-20 flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-4xl font-extrabold">Pedal Dashboard</h1>
        <p>Layout and save your dream pedalboard</p>
      </Link>
      <Link to="/login">Login</Link>
    </header>
  )
}

export { Header }