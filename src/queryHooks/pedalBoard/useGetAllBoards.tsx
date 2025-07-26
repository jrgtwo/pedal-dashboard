import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetAllBoards = () => {

  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: ['boards'],
    queryFn: API.pedalBoard.getAllBoards
  })

  return { isLoading, isSuccess, isError, boardList: data?.data, error: data?.error }
}

export { useGetAllBoards }
