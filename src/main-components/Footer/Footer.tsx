import { Link } from 'react-router';

const Footer = () => {

  return (

    <footer role="footer"
      className="mt-10 mb-10">
      <Link to="/">PedalDashboard.com</Link>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  )
}

export { Footer }
