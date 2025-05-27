import { useQuery } from '@tanstack/react-query';
import { API } from '../../../api/api';

const useGetMyPedal = (userPedalId: number) => {
  debugger
  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: ['myPedal', userPedalId],
    queryFn: () => API.gear.getMyPedalById({ userPedalId })
  })

  return { isLoading, isSuccess, isError, data, status, refetch }

}

export { useGetMyPedal }
