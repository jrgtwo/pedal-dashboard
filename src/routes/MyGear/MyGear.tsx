import { useMemo } from "react"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useSaveUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyPedals()
  const { isSuccess: allPedalsSuccess, isLoading: allPedalsLoading, pedalList } = useGetAllPedals()
  const mutation = useSaveUserPedal()

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

  if (isLoading || allPedalsLoading)
    return <h2>...Loading</h2>

  if (isError)
    return <h2>...Error!, {data?.error}</h2>

  return (
    <>
      <h2>My Gear</h2>
      <PedalSelector
        myPedalIdList={myPedalIdList}
        isSuccess={isSuccess}
        pedalList={pedalList}
        savePedalDataById={handleSavepedalDataById}
      />
      {JSON.stringify(data)}
    </>
  )
}

export { MyGear }
