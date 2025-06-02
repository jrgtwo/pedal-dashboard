import { useEffect, useMemo } from 'react'
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useMyGearStore } from "./state/useMyGearStore"
import { buttonVariants } from "@/components/ui/button"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"

import { useSaveUserPedal, useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
const AddGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyPedals()

  const myPedalList = useMyGearStore((state) => state.pedalList)
  const { isLoading: allPedalsLoading, pedalList } = useGetAllPedals()

  const mutation = useSaveUserPedal()
  const deleteMutation = useDeleteUserPedal()

  const setPedalList2 = useMyGearStore((state) => state.setPedalList)
  const addPedalToList = useMyGearStore((state) => state.addPedalToList)
  const removePedalFromList = useMyGearStore((state) => state.removePedalFromList)

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
    if (myPedalIdList && myPedalIdList?.length !== 0) {
      setPedalList2(myPedalIdList)
    }
  }, [myPedalIdList, setPedalList2])

  useEffect(() => {
    if (mutation.isSuccess) {
      addPedalToList(mutation?.data?.data?.[0]?.pedal_id)
    }
  }, [mutation.isSuccess, mutation.data, addPedalToList])

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      removePedalFromList(deleteMutation?.data?.data?.[0]?.pedal_id)
    }
  }, [deleteMutation.isSuccess, deleteMutation.data, removePedalFromList])

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
