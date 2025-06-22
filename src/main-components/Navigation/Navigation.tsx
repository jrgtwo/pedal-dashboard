import { NavLink } from 'react-router'
import { useLoginStore, LOGIN_STATES } from '../../store/login'
import { Button } from '@/components/ui/button'
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
                to="/my-gear">
                {({ isActive }) => (
                  <Button variant={isActive ? 'default' : 'outline'}>
                    My Gear
                  </Button>
                )}
              </NavLink>

            </li>

            <li>
              <NavLink
                to="/my-boards">
                {({ isActive }) => (
                  <Button variant={isActive ? 'default' : 'outline'}>
                    My Boards
                  </Button>
                )}
              </NavLink>
            </li>
          </>
        }
        <li>
          <NavLink
            to="/create">
            {({ isActive }) => (
              <Button variant={isActive ? 'default' : 'outline'}>
                Create
              </Button>
            )}
          </NavLink>
        </li>
      </ol>
    </nav >
  )
}

export { Navigation }
