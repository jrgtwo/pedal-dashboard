import { NavLink } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'

const Navigation = () => {

  const isLoggedIn = useLoginStore((store) => store.isLoggedIn)

  return (
    <nav role="navigation"
      className="mt-5 mb-5 border-b border-zinc-300">
      <ol
        className="flex flex-row justify-self-end gap-4">
        {
          isLoggedIn === LOGIN_STATES.LOGGED_IN &&
          <li>
            <NavLink
              to="/my-boards"
              className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
              My Boards
            </NavLink>
          </li>
        }
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
