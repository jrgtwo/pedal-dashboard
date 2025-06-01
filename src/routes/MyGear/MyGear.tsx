import { useMemo, useEffect, Fragment } from "react"
import { Link } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useSaveUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
import { useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
import { useMyGearStore } from "./state/useMyGearStore"
import { Separator } from "@/components/ui/separator"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyPedals()
  const { isLoading: allPedalsLoading, pedalList } = useGetAllPedals()
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
    return <h2>...Error!, {JSON.stringify(data?.error || {})}</h2>

  console.log('pedalList', myPedalIdList, myPedalList)

  return (
    <>
      <h2 className="text-4xl font-[bebas_neue]">My Gear</h2>
      <Separator />
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <Separator />

        <section className="flex flex-col">
          <h3 className="text-2xl font-[bebas_neue]">My Pedals</h3>
          <PedalSelector
            className={`m-0 w-fit ${buttonVariants({ variant: "outline" })}`}
            myPedalIdList={myPedalList}
            isSuccess={isSuccess}
            pedalList={pedalList}
            savePedalDataById={handleSavepedalDataById}
            deletePedalDataById={handleDeletePedal}
          />
          {data?.data && data?.data.map((userPedalId) => {
            const linkedPedal = pedalList?.find((pedal) => {
              return parseInt(userPedalId.pedal_id, 10) === pedal.id
            })
            if (!linkedPedal) return null
            return (
              <Fragment key={userPedalId.id}>
                <Link
                  to={`/my-gear/pedals/${userPedalId.id}/${linkedPedal.id}/${encodeURIComponent(linkedPedal.name.replace(/ /g, '-'))}`}>
                  <img width="50" src={`/src/assets/${linkedPedal.img}`} /><span>{linkedPedal.name}</span>
                </Link>
                <Separator />
              </Fragment>
            )
          })}
        </section>
      </div>
    </>
  )
}

export { MyGear }
