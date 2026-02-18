import { useMutation } from "@tanstack/react-query"
import { API } from "@/api/api"
import { QueryKeys } from "../queryKeys"
import { useQueryClient } from "@tanstack/react-query"

function useSaveUserPedal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: API.gear.saveUserPedal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myPedals.all });
    },
  });
}

const useDeleteUserPedal = () => {
  const mutation = useMutation({
    mutationFn: API.gear.deleteUserPedal
  })

  return mutation
}

export { useSaveUserPedal, useDeleteUserPedal }
