import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"

const useGetMyPedals = () => {

  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: QueryKeys.myPedals.all,
    queryFn: API.gear.getMyPedals
  })

  return { isLoading, isSuccess, isError, data, status, refetch }
}

export { useGetMyPedals }
