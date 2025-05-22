import { useMutation } from '@tanstack/react-query'
import { API } from '../../api/api'
import { useLoginStore } from '../../store/login'

function useLogin() {
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)

  const mutation = useMutation({
    mutationFn: API.auth.login
  })

  if (mutation.isError) {
    console.error(mutation.error)
    return
  }
  if (mutation.isSuccess && mutation.data && mutation.data.data?.session?.user) {

    setLoginStatus(mutation.data.data.session.user)
  }

  return { mutation, setLoginStatus }
}

export { useLogin }
