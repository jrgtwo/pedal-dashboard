import { useMutation } from "@tanstack/react-query"
import { API } from "../../api/api"

const useSaveBoard = () => {
  const mutation = useMutation({
    mutationFn: API.pedalBoard.saveBoard
  })

  return { mutation }
}

export { useSaveBoard }
