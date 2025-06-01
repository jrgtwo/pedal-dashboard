import { NavLink } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'

const Navigation = () => {

  const user_status = useLoginStore((store) => store.user_status)

  return (
    <nav role="navigation"
      className="mt-5 mb-5">
      <ol
        className="flex flex-row justify-self-end gap-4">
        {
          user_status === LOGIN_STATES.LOGGED_IN &&
          <>
            <li>
              <NavLink
                to="/my-gear"
                className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
                My Gear
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-boards"
                className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
                My Boards
              </NavLink>
            </li>
          </>
        }
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => isActive ? "font-black hover:underline" : ""}>
            Create
          </NavLink>
        </li>
      </ol>
    </nav>
  )
}

export { Navigation }
