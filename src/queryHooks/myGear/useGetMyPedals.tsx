import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetMyPedals = () => {
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ['myPedals'],
    queryFn: API.gear.getMyPedals
  })

  return { isLoading, isSuccess, isError, data }
}

export { useGetMyPedals }
