import { useEffect } from "react"
import { API } from "../../api/api"
import { useMyGearStore } from "@/api/Gear/gear"
import { useQuery } from "@tanstack/react-query"

const useGetMyPedals = () => {

  const query = useQuery({
    queryKey: ['myPedals'],
    queryFn: API.gear.getMyPedals
  })
  const { isLoading, isSuccess, isError, data, status, refetch } = query

  useEffect(() => {
    if (isSuccess) {
      API.gear.store.setMyPedals(data?.data || [])
    }
  }, [isSuccess, data])

  const outputData = useMyGearStore((state) => state.myPedals)


  return { isLoading, isSuccess, isError, data: outputData, status, refetch }
}

export { useGetMyPedals }
