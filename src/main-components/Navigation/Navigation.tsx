import { Link } from 'react-router'

const Navigation = () => {

  return (
    <nav>
      <ol>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ol>
    </nav>
  )
}

export { Navigation }