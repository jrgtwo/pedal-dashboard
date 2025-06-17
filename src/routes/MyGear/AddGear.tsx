import { useEffect, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
// import { useMyGearStore } from "./state/useMyGearStore"
import { API } from "@/api/api"
import { buttonVariants } from "@/components/ui/button"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"

import { useSaveUserPedal, useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
const AddGear = () => {

  const queryClient = useQueryClient()

  const { isLoading, isSuccess, isError, data } = useGetMyPedals()

  const myPedalList = API.gear.store((state) => state.myPedals)?.map((item) => {
    return item?.pedals?.id || {}
  })
  const { isLoading: allPedalsLoading, pedalList } = useGetAllPedals()

  const mutation = useSaveUserPedal()
  const deleteMutation = useDeleteUserPedal()

  const myPedalIdList = useMemo(() => {
    if (!data || !data.data) return []
    return data.data.map(pedal => pedal.pedal_id)
  }, [data])

  const handleSavepedalDataById = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    mutation.mutate({ pedal_id: pedalId, notes: {} })
  }

  const handleDeletePedal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    deleteMutation.mutate({ pedal_id: pedalId })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['myPedals'] })
    }
  }, [mutation.isSuccess, mutation.data, queryClient])

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['myPedals'] })
    }
  }, [deleteMutation.isSuccess, deleteMutation.data, queryClient])

  if (isLoading || allPedalsLoading)
    return <h2>...Loading</h2>

  if (isError)
    return <h2>...Error!, {JSON.stringify(data?.error || {})}</h2>

  console.log('pedalList', myPedalIdList, myPedalList)

  return (
    <PedalSelector
      className={`m-0 w-fit ${buttonVariants({ variant: "outline" })}`}
      myPedalIdList={myPedalList}
      isSuccess={isSuccess}
      pedalList={pedalList}
      savePedalDataById={handleSavepedalDataById}
      deletePedalDataById={handleDeletePedal}
    />
  )
}

export { AddGear }
