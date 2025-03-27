import { NavLink } from 'react-router'

const Navigation = () => {

  return (
    <nav role="navigation"
      className="mt-5 mb-5 border-b border-zinc-300">
      <ol
        className="flex flex-row justify-self-end gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
            Create
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
            About
          </NavLink>
        </li>
      </ol>
    </nav>
  )
}

export { Navigation }