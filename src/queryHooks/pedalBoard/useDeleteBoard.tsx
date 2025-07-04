import { useMutation } from "@tanstack/react-query"
import { API } from "../../api/api"

const useDeleteBoard = () => {

  const mutation = useMutation({
    mutationFn: API.pedalBoard.deleteBoard
  })

  return { mutation }
}

export { useDeleteBoard }
