import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useLoginStore, LOGIN_STATES } from '../store/login';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn)

  if (isLoggedIn !== LOGIN_STATES.LOGGED_IN) {
    return <Navigate to="/login" />
  }

  return children
}

export { ProtectedRoute }
