import { useMutation } from "@tanstack/react-query"
import { API } from "@/api/api"
import { QueryKeys } from "../queryKeys"

const useSaveUserBoard = () => {
  const mutation = useMutation({
    mutationKey: QueryKeys.myBoard.all,
    mutationFn: API.gear.saveUserBoard
  })

  return mutation
}

const useDeleteUserBoard = () => {
  const mutation = useMutation({
    mutationFn: API.gear.deleteUserBoard
  })

  return mutation
}

export { useSaveUserBoard, useDeleteUserBoard }
