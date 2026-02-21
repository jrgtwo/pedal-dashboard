import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "@/api/api"
import { QueryKeys } from "../queryKeys"

const useSaveUserBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: API.gear.saveUserBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myBoards.all });
    },
  })

  return mutation
}

const useDeleteUserBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: API.gear.deleteUserBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myBoards.all });
    },
  })

  return mutation
}

export { useSaveUserBoard, useDeleteUserBoard }
