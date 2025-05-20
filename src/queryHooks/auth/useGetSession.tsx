import { useQuery } from '@tanstack/react-query'
import { API } from '../../api/api'
import { useLoginStore } from '../../store/login'

function useGetSession() {
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)
  
  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: ['session'], queryFn: API.auth.getSession
  })

  if (isError) {
    console.error(error)
    return
  }

  if (isSuccess && data && data.data?.session?.user) {
    setLoginStatus(data.data.session.user)
  } else if (!isLoading && isSuccess) {
    setLoginStatus(null)
  }
}

export { useGetSession }
