import { useMutation } from "@tanstack/react-query"
import { API } from "@/api/api"
import { QueryKeys } from "../queryKeys"

const useSaveUserPedal = () => {
  const mutation = useMutation({
    mutationKey: QueryKeys.myPedals.all,
    mutationFn: API.gear.saveUserPedal
  })

  return mutation
}

const useDeleteUserPedal = () => {
  const mutation = useMutation({
    mutationFn: API.gear.deleteUserPedal
  })

  return mutation
}

export { useSaveUserPedal, useDeleteUserPedal }
