import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { API } from '../../api/api'

function useGetSession({ setLoginStatus }) {
  const { isLoading, isSuccess, data, isError } = useQuery({ queryKey: ['session'], queryFn: API.auth.getSession })
  // debugger


  if (isError) {
    debugger
    console.error(error)
    return
  }

  if (!isLoading) {
    debugger
  }
  if (isSuccess && data && data.data?.session?.user) {
    debugger
    setLoginStatus(data.data.session.user)
  } else {
    // debugger
    setLoginStatus(null)
    // setLoginStatus(query)
  }
}

export { useGetSession }
