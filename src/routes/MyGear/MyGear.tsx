import { useMemo } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useSaveUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"
import { useDeleteUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data, status, refetch } = useGetMyPedals()
  const { isSuccess: allPedalsSuccess, isLoading: allPedalsLoading, pedalList } = useGetAllPedals()
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
    refetch()
  }

  const handleDeletePedal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.currentTarget as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    deleteMutation.mutate({ pedal_id: pedalId })
    refetch()
  }

  if (isLoading || allPedalsLoading)
    return <h2>...Loading</h2>

  if (isError)
    return <h2>...Error!, {data?.error}</h2>

  return (
    <>
      <h2>My Gear</h2>
      <div className="flex flex-row">
        <PedalSelector
          myPedalIdList={myPedalIdList}
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
