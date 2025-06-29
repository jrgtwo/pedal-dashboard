import { Link } from 'react-router'

import { Navigation } from '../../main-components/Navigation/Navigation'
const Header = () => {
  return (
    <header role="header"
      className="backdrop-blur-md flex flex-row justify-between px-8 py-4 fixed w-full bg-white/60 shadow-md z-100">

      <Link to="/">
        <h1 className="text-shadow-white text-shadow-2xl text-5xl font-heading " >Pedal DASHBOARD</h1>
        <p className="text-2-xl font-heading">Layout and save your dream pedalboard</p>
      </Link>

      <Navigation />
    </header >
  )
}

export { Header }
