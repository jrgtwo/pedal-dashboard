import { useMutation } from "@tanstack/react-query"
import { API } from "../../api/api"

const useRegister = () => {

  const mutation = useMutation({
    mutationFn: API.auth.register
  })

  return { mutation }
}

export { useRegister }
