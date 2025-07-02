import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';

const Footer = () => {

  return (
    <footer role="footer"
      className="mt-30 mb-10">
      <Separator className="mb-20" />
      <div className="flex flex-row justify-center items-stretch gap-16">

        <div>
          <div className="flex flex-col gap-2 my-auto">
            <ul className='list-disc'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/my-gear">My Gear</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/my-pedals">My Pedals</Link></li>

            </ul>
          </div>
        </div>
        <Separator orientation='vertical' className="h-auto w-2" />
        <div className="flex flex-col gap-2 my-auto">
          <ul className='list-disc'>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
        <Separator orientation='vertical' className="h-auto w-2" />
        <div className="my-auto">
          <div>
            <Link className="font-heading text-2xl" to="/">PedalDashboard.com</Link>
            <p>© {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer >
  )
}

export { Footer }
