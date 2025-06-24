import { Link } from 'react-router'

import { Navigation } from '../../main-components/Navigation/Navigation'
const Header = () => {
  return (
    <header role="header"
      className=" flex flex-row justify-between px-8 py-4 fixed w-full bg-white shadow-md z-10">

      <Link to="/">
        <h1 className="text-5xl font-[Lilita_One]" style={{ "textShadow": "1px 1px rgba(255,255,255,0.9),2px 2px rgba(0,0,0,0.9)" }}>Pedal Dashboard</h1>
        <p className="text-2-xl font-[Bebas_Neue]">Layout and save your dream pedalboard</p>
      </Link>

      <Navigation />
    </header >
  )
}

export { Header }
