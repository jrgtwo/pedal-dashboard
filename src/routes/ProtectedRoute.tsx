import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useLoginStore, LOGIN_STATES } from '../store/login';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user_status = useLoginStore((state) => state.user_status)

  if (user_status === LOGIN_STATES.LOGGED_OUT) {
    return <Navigate to="/login" />
  }

  if (user_status === LOGIN_STATES.NOT_CHECKED) {
    return null
  }

  return children
}

export { ProtectedRoute }
