import { API } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const useLogout = () => {

  const mutation = useMutation({
    mutationFn: API.auth.logout
  })

  return { mutation }

}

export { useLogout }
