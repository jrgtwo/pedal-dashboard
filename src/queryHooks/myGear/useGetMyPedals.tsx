import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetMyPedals = () => {
  const query = useQuery({
    queryKey: ['myPedals'],
    queryFn: API.gear.getMyPedals
  })
  const { isLoading, isSuccess, isError, data, status, refetch } = query

  return { isLoading, isSuccess, isError, data, status, refetch }
}

export { useGetMyPedals }
