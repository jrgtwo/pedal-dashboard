import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../queryHooks/queryKeys"

const useGetAllBoards = () => {

  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: QueryKeys.boards.all,
    queryFn: API.pedalBoard.getAllBoards
  })

  return { isLoading, isSuccess, isError, boardList: data }
}

export { useGetAllBoards }
