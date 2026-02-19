import { QueryClient, useMutation } from "@tanstack/react-query"
import { API } from "../../api/api"
import { QueryKeys } from "../queryKeys"

const useDeleteBoard = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: API.pedalBoard.deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.myPedalBoards.all })
    }
  })

  return { mutation }
}

export { useDeleteBoard }
