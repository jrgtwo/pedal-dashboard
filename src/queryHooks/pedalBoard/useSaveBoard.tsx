import { useMutation } from "@tanstack/react-query"
import { API } from "../../api/api"
import { QueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../queryKeys"

const useSaveBoard = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: API.pedalBoard.saveBoard,
    onSuccess: (data) => {
      const boardId = data?.[0]?.id;
      if (!boardId) return;
      queryClient.invalidateQueries({ queryKey: QueryKeys.myPedalBoards.byId(boardId) })
    },
  })

  return { mutation }
}

export { useSaveBoard }
