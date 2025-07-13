import { useQuery } from '@tanstack/react-query'
import { API } from '../../api/api'

function useGetBoards() {
  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: ['myBoards'], queryFn: API.pedalBoard.getUserBoards
  })


  return { isLoading, isSuccess, isError, boards: data?.data, error: data?.error }
}

export { useGetBoards }
