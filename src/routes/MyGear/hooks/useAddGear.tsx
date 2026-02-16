import { useEffect } from "react"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { toast } from "sonner"
import { useSaveUserPedal, useDeleteUserPedal } from "../../../queryHooks/myGear/useSaveUserPedal"
import { useSaveUserBoard, useDeleteUserBoard } from "../../../queryHooks/myGear/useSaveUserBoard"

const useAddGear = () => {

  const { isLoading, isSuccess, isError, data } = useGetMyPedals()

  const myPedalList = data?.map((item) => item?.pedals?.id || {})

  const mutation = useSaveUserPedal()
  const deleteMutation = useDeleteUserPedal()
  const boardMutation = useSaveUserBoard()
  const boardDeleteMutation = useDeleteUserBoard()

  const handleSavepedalDataById = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const pedalId = elem && parseInt(elem.dataset?.pedalId || '', 10)

    mutation.mutate({ pedal_id: pedalId, notes: {} })
  }

  const handleDeletePedal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const pedalId = elem && parseInt(elem.dataset?.pedalId || '', 10)

    deleteMutation.mutate({ pedal_id: pedalId })
  }

  const handleSaveBoardDataById = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const boardId = elem && parseInt(elem.dataset?.pedalId || '', 10)
    boardMutation.mutate({ board_id: boardId, notes: {} })
  }

  const handleDeleteBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const boardId = elem && parseInt(elem.dataset?.pedalId || '', 10)

    boardDeleteMutation.mutate({ board_id: boardId })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Pedal saved successfully!')
    }
  }, [mutation.isSuccess, mutation.data])

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success('Pedal deleted successfully!')
    }
  }, [deleteMutation.isSuccess, deleteMutation.data])

  return {
    myPedalList,
    handleSavepedalDataById,
    handleSaveBoardDataById,
    handleDeletePedal,
    handleDeleteBoard,
    isLoading,
    isSuccess,
    isError,
    data
  }
}

export { useAddGear }
