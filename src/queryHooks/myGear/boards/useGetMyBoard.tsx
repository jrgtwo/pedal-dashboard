import { useQuery, useMutation } from '@tanstack/react-query';
import { API } from '../../../api/api';
import { QueryKeys } from '../../../queryHooks/queryKeys';

const useGetMyBoard = (userBoardId: number) => {
  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: QueryKeys.myBoard.byId(userBoardId),
    queryFn: () => API.gear.getMyBoardById({ userBoardId }),
    enabled: !!userBoardId
  })

  return { isLoading, isSuccess, isError, data, status, refetch }
}

const useSaveMyBoard = () => {
  const mutation = useMutation({
    mutationFn: API.gear.updateUserBoard
  })

  return mutation
}

export { useGetMyBoard, useSaveMyBoard }
