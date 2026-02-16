import { useQuery, useMutation } from '@tanstack/react-query';
import { API } from '../../../api/api';
import { QueryKeys } from '../../../queryHooks/queryKeys';

const useGetMyPedal = (userPedalId: number) => {
  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: QueryKeys.myPedal.byId(userPedalId),
    queryFn: () => API.gear.getMyPedalById({ userPedalId })
  })

  return { isLoading, isSuccess, isError, data, status, refetch }
}

const useSaveMyPedal = () => {
  const mutation = useMutation({
    mutationFn: API.gear.updateUserPedal
  })

  return mutation
}

export { useGetMyPedal, useSaveMyPedal }
