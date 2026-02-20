import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../queryHooks/queryKeys"

const useGetAllPedals = () => {

  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: QueryKeys.pedals.all,
    queryFn: API.pedalBoard.getAllPedals
  })

  return { isLoading, isSuccess, isError, pedalList: data }
}

export { useGetAllPedals }
