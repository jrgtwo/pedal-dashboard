import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLoginStore } from '../../store/login'
import { API } from '../../api/api'

const Logout = () => {
  const navigate = useNavigate()
  const logout = useLoginStore((store) => store.logout)

  useEffect(() => {
    (async () => {
      const tryLogout = await API.logout()
      const { error } = tryLogout

      if (error) {
        console.log(error)
        return
      }
      logout()
      navigate('/')
    })()
  })

  return (
    <p>Logging you out</p>
  )
}

export { Logout }
