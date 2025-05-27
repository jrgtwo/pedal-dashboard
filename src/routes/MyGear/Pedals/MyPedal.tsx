import { useParams } from "react-router"
import { useGetMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { useSaveMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { Textarea } from "@/components/ui/textarea"

const MyPedal = () => {
  const { userPedalId, pedalId } = useParams<{
    userPedalId: string,
    pedalId: string
  }>()
  const mutation = useSaveMyPedal()

  const onSubmitSaveNotes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const notes = formData.get('notes') as string
    debugger
    mutation.mutate({ id: Number(userPedalId), notes })
  }

  const { isLoading, isSuccess, isError, data, status, refetch } = useGetMyPedal(Number(userPedalId))
  const pedalData = data?.data?.[0]?.pedals
  debugger

  return (
    <div>
      <h2 className="text-2xl font-[bebas_neue]">My Pedal</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading pedal data.</p>}
      {isSuccess && data && (
        <div>
          <h3>{pedalData?.name}</h3>
          <p>Notes:</p>
          <form onSubmit={onSubmitSaveNotes} className="mb-4">
            <Textarea
              name="notes"
              className="w-full"
              defaultValue={data?.data?.[0]?.notes?.plain || ''}
              placeholder="Add notes about how your use this pedal, and any settings you like." />
            <button type="submit" className="btn btn-primary">Save Notes</button>
          </form>

          <img src={`/src/assets/${pedalData.img}`} alt={pedalData?.name} />
          {/* Add more pedal details as needed */}
        </div>
      )}
      <p>This is a placeholder for the My Pedal page.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export { MyPedal }
