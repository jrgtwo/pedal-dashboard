import { useMemo, useEffect } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useSaveUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
import { useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
import { useMyGearStore } from "./state/useMyGearStore"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyPedals()
  const { isSuccess: allPedalsSuccess, isLoading: allPedalsLoading, pedalList } = useGetAllPedals()
  const mutation = useSaveUserPedal()
  const deleteMutation = useDeleteUserPedal()

  const myPedalList = useMyGearStore((state) => state.pedalList)
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
    return <h2>...Error!, {data?.error}</h2>

  console.log('pedalList', myPedalIdList, myPedalList)

  return (
    <>
      <h2>My Gear</h2>
      <div className="flex flex-row">
        <PedalSelector
          myPedalIdList={myPedalList}
          isSuccess={isSuccess}
          pedalList={pedalList}
          savePedalDataById={handleSavepedalDataById}
          deletePedalDataById={handleDeletePedal}
        />
      </div>
      <section className="flex flex-col">
        {data?.data && data?.data.map((userPedalId) => {
          const linkedPedal = pedalList.find((pedal) => {
            return parseInt(userPedalId.pedal_id, 10) === pedal.id
          })

          return (
            <Link
              key={userPedalId.pedal_id}
              to={`/my-gear/pedals/${userPedalId.pedal_id}/${encodeURIComponent(linkedPedal.name.replace(/ /g, '-'))}`}>
              {linkedPedal.name}
            </Link>
          )
        })}
      </section>
    </>
  )
}

export { MyGear }
