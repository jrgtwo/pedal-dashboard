import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetMyBoards = () => {

  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: ['myBoards'],
    queryFn: API.gear.getMyBoards
  })

  return { isLoading, isSuccess, isError, data: data?.data, status, refetch }
}

export { useGetMyBoards }
