import { API } from "../../api/api"
import { useQuery } from "@tanstack/react-query"

const useGetBoardById = (boardId: number) => {
  const query = useQuery({
    queryKey: ['myBoards', boardId],
    queryFn: () => API.pedalBoard.getBoardById(boardId),
    enabled: !!boardId
  })

  return query
}

export { useGetBoardById }
