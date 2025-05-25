import { useMutation } from "@tanstack/react-query"
import { API } from "@/api/api"

const useSaveUserPedal = () => {
  const mutation = useMutation({
    mutationFn: API.gear.saveUserPedal
  })

  return mutation
}

export { useSaveUserPedal }
