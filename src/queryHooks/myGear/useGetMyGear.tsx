import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"

const useGetMyGear = () => {
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: QueryKeys.myGear.all,
    queryFn: API.gear.getMyGear
  })

  return { isLoading, isSuccess, isError, data }
}

export { useGetMyGear }
