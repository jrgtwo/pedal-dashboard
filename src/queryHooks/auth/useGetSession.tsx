import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { API } from '../../api/api'
import { LOGIN_STATES, useLoginStore } from '../../store/login'

const useGetSession = () => {
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)
  const user_status = useLoginStore((state) => state.user_status)

  const {
    isLoading, isSuccess, data, error
  } = useQuery({
    queryKey: ['session'], queryFn: API.auth.getSession
  })
  if (error) {
    // TODO: handle error more gracefully
    console.error('Error fetching session:', error)
  }
  useEffect(() => {
    if (user_status === LOGIN_STATES.NOT_CHECKED) {
      if (isSuccess && data && data.data?.session?.user) {
        setLoginStatus(data.data.session.user)
      } else if (!isLoading && isSuccess) {
        setLoginStatus(null)
      }
    }
  }, [isSuccess, data, isLoading, setLoginStatus, user_status])


}

export { useGetSession }
