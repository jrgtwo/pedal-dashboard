import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetMyGear = () => {
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ['myGear'],
    queryFn: API.gear.getMyGear
  })

  return { isLoading, isSuccess, isError, data }
}

export { useGetMyGear }
