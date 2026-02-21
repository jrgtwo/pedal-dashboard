import { useMutation } from '@tanstack/react-query'
import { API } from '../../api/api'
import { useLoginStore } from '../../store/login'

const useAuthLogin = () => {
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)

  const mutation = useMutation({
    mutationFn: API.auth.login
  })

  if (mutation.isError) {
    console.error(mutation.error)
    return { mutation: null, setLoginStatus: null }
  }
  if (mutation.isSuccess && mutation.data && mutation.data?.session?.user) {

    setLoginStatus(mutation.data.session.user)
  }

  return { mutation, setLoginStatus }
}

export { useAuthLogin }
