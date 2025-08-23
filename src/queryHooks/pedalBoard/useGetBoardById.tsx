import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetBoardById = (boardId: number) => {
  const query = useQuery({
    queryKey: ['myPedalBoards', boardId],
    queryFn: () => API.pedalBoard.getBoardById(boardId),
    enabled: !!boardId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  })

  return query
}

export { useGetBoardById }
