import { useQuery, useMutation } from '@tanstack/react-query';
import { API } from '../../../api/api';

const useGetMyBoard = (userBoardId: number) => {
  const { isLoading, isSuccess, isError, data, status, refetch } = useQuery({
    queryKey: ['myBoard', userBoardId],
    queryFn: () => API.gear.getMyBoardById({ userBoardId })
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
