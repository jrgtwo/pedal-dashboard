import { useMutation } from "@tanstack/react-query"
import { API } from "@/api/api"

const useSaveUserPedal = () => {
  const mutation = useMutation({
    mutationKey: ['myPedals'],
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
