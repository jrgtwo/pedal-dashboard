import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';

const Footer = () => {

  return (
    <footer role="footer"
      className="mt-30 mb-10">
      <Separator className="mb-20" />
      <Link to="/">PedalDashboard.com</Link>
      <p>© {new Date().getFullYear()}</p>
    </footer >
  )
}

export { Footer }
