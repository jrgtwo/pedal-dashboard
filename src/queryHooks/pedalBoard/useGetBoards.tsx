import { useQuery } from '@tanstack/react-query'
import { API } from '../../api/api'
import { QueryKeys } from '../../queryHooks/queryKeys'

function useGetBoards() {
  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: QueryKeys.myPedalBoards.all,
    queryFn: API.pedalBoard.getUserBoards
  })


  return { isLoading, isSuccess, isError, boards: data }
}

export { useGetBoards }
