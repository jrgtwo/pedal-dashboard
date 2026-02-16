import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"

const useGetMyBoards = () => {

  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: QueryKeys.myBoard.all,
    queryFn: API.gear.getMyBoards
  })

  return { isLoading, isSuccess, isError, data: data?.data, status, refetch }
}

export { useGetMyBoards }
