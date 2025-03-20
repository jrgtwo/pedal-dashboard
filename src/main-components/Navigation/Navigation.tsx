import { Link } from 'react-router'

const Navigation = () => {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}

export { Navigation }