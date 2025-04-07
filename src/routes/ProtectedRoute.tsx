import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useLoginStore, LOGIN_STATES } from '../store/login';
import { ROUTES } from '../constants/routes'

type ProtectedRouteProps = {
  children: ReactNode;
  redirect?: string
};

const ProtectedRoute = ({ children, redirect = ROUTES.LOGIN }: ProtectedRouteProps) => {
  const user_status = useLoginStore((state) => state.user_status)

  if (user_status === LOGIN_STATES.LOGGED_OUT) {
    return <Navigate to={redirect} />
  }

  if (user_status === LOGIN_STATES.NOT_CHECKED) {
    return null
  }

  return children
}

export { ProtectedRoute }
