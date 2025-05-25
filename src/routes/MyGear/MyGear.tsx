import { useGetMyGear } from "@/queryHooks/myGear/useGetMyGear"
import { PedalSelector } from "../Create/components/Menu/PedalSelector"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useSaveUserPedal } from "@/queryHooks/myGear/useSaveUserPedal"

const MyGear = () => {
  const { isLoading, isSuccess, isError, data } = useGetMyGear()
  const { isSuccess: allPedalsSuccess, isLoading: allPedalsLoading, pedalList } = useGetAllPedals()
  const mutation = useSaveUserPedal()

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
        isSuccess={isSuccess}
        pedalList={pedalList}
        savePedalDataById={handleSavepedalDataById}
      />
      {JSON.stringify(data)}
    </>
  )
}

export { MyGear }
