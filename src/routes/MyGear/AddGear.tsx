import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { GearSelector } from "../Create/components/Menu/GearSelector"
import { buttonVariants } from "@/components/ui/button"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { toast } from "sonner"

import { useSaveUserPedal, useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
const AddGear = () => {

  const queryClient = useQueryClient()

  const { isLoading, isSuccess, isError, data } = useGetMyPedals()

  const myPedalList = data?.map((item) => item?.pedals?.id || {})

  const mutation = useSaveUserPedal()
  const deleteMutation = useDeleteUserPedal()

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

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['myPedals'] })
      toast.success('Pedal saved successfully!')
    }
  }, [mutation.isSuccess, mutation.data, queryClient])

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['myPedals'] })
      toast.success('Pedal deleted successfully!')
    }
  }, [deleteMutation.isSuccess, deleteMutation.data, queryClient])


  if (isError)
    return <h2>...Error!, {JSON.stringify(data?.error || {})}</h2>

  if (!isSuccess || isLoading || !data || data.length === 0) {
    return <h2>No Pedals Found</h2>
  }

  return (
    <section>
      <GearSelector
        className={`w-fit ${buttonVariants({ variant: "outline" })}`}
        myPedalIdList={myPedalList}
        savePedalDataById={handleSavepedalDataById}
        deletePedalDataById={handleDeletePedal}
      />
    </section>

  )
}

export { AddGear }
