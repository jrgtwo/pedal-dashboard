import { useParams } from "react-router"
import { useGetMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { useSaveMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { Textarea } from "@/components/ui/textarea"
import { PedalShape } from "@/routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useEffect } from "react"

const MyPedal = () => {
  const { userPedalId } = useParams<{
    userPedalId: string
  }>()
  const mutation = useSaveMyPedal()

  const onSubmitSaveNotes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const notes = formData.get('notes') as string
    const title = formData.get('title') as string
    mutation.mutate({ id: Number(userPedalId), notes, title })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Pedal updates saved successfully!')
    }
  }, [mutation.isSuccess])

  const { isLoading, isSuccess, isError, data } = useGetMyPedal(Number(userPedalId))
  const pedalData = data?.data?.[0]?.pedals as PedalShape | undefined

  return (
    <div>
      <h2 className="text-4xl font-[bebas_neue]">My Pedal</h2>
      <Separator />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading pedal data.</p>}
      {isSuccess && data && (
        <div className="mt-8">
          <div className="flex flex-row gap-4">
            <img
              src={`/src/assets/${pedalData?.img}`}
              alt={pedalData?.name}
              width={250} />
            <form onSubmit={onSubmitSaveNotes} className="mb-4">
              <h3>Name: {pedalData?.name}</h3>
              <h3>Brand: {pedalData?.mfg}</h3>
              <h3>Type: {pedalData?.type}</h3>
              <h3>Description: {pedalData?.description}</h3>
              <p>Title:</p>
              <input
                type="text"
                name="title"
                className="w-full mb-2 border-2 border-gray-300 p-2 rounded"
                defaultValue={data?.data?.[0]?.title || ''}
                placeholder="Give this pedal a title, like 'My Favorite Overdrive'" />
              <p>Notes:</p>
              <Textarea
                name="notes"
                className="w-full"
                defaultValue={data?.data?.[0]?.notes?.plain || ''}
                placeholder="Add notes about how you use this pedal, and any settings you like." />
              <Button type="submit" className="btn btn-outline">Save Notes</Button>
            </form>
          </div>
          {/* Add more pedal details as needed */}
        </div>
      )}
      <p>This is a placeholder for the My Pedal page.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export { MyPedal }
