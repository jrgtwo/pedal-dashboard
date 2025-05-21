import { useQuery } from '@tanstack/react-query'
import { API } from '../../api/api'
import type { Database } from '../../../database.types'

type USER_BOARD = Database['public']['Tables']['user_boards']['Row']

function useGetBoards() {
  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: ['myBoards'], queryFn: API.pedalBoard.getBoards
  })


  return { isLoading, isSuccess, isError, boards: data?.data, error: data?.error }
}

export { useGetBoards }
