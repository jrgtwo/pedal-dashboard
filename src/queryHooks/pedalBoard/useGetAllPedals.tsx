import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetAllPedals = () => {

  const {
    isLoading, isSuccess, data, isError
  } = useQuery({
    queryKey: ['pedals'],
    queryFn: API.pedalBoard.getAllPedals
  })

  return { isLoading, isSuccess, isError, pedalList: data?.data, error: data?.error }
}

export { useGetAllPedals }
