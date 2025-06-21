import { useEffect } from "react"
import { API } from "../../api/api"
import { useMyGearStore } from "@/routes/MyGear/state/useMyGearStore"
import { useQuery } from "@tanstack/react-query"

const useGetMyPedals = () => {

  const query = useQuery({
    queryKey: ['myPedals'],
    queryFn: API.gear.getMyPedals
  })
  const { isLoading, isSuccess, isError, data, status, refetch } = query

  const outputData = useMyGearStore((state) => state.myPedals)
  const setMyPedals = useMyGearStore((state) => state.setMyPedals)

  useEffect(() => {
    if (isSuccess) {
      console.log('hi')
      setMyPedals(data?.data || [])
    }
  }, [isSuccess, data, setMyPedals])

  return { isLoading, isSuccess, isError, data: outputData, status, refetch }
}

export { useGetMyPedals }
