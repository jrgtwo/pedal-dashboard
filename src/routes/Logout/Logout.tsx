import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLoginStore } from '../../store/login'

import { useLogout } from '../../queryHooks/auth/useLogout'

const Logout = () => {
  const navigate = useNavigate()
  const logout = useLoginStore((store) => store.logout)
  const { mutation } = useLogout()
  useEffect(() => {
    (async () => {
      mutation.mutate()
    })()
  }, [mutation])

  if (mutation.isSuccess) {
    logout()
    navigate('/')
  }

  return (
    <p>Logging you out</p>
  )
}

export { Logout }
