import { useParams } from "react-router"
import { useGetMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { useSaveMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { Textarea } from "@/components/ui/textarea"
import { PedalShape } from "@/routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
    mutation.mutate({ id: Number(userPedalId), notes })
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
      <h2 className="text-4xl font-heading py-4">My Pedal</h2>
      <Separator />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading pedal data.</p>}

      {isSuccess && data && (
        <div className="mt-8 px-8">
          <div className="flex flex-row gap-8 justify-center">
            <img
              src={`/src/assets/${pedalData?.img}`}
              alt={pedalData?.name}
              width={250} />
            <section>
              <h3 className="text-2xl font-heading">{pedalData?.name}</h3>
              <h3>{pedalData?.mfg}</h3>
              {pedalData?.type.map((type, index) => {
                return <Badge key={type}>{type}</Badge>
              })}

              <h3>Description: {pedalData?.description}</h3>
              <form
                onSubmit={onSubmitSaveNotes}
              >
                <p>My Notes:</p>
                <Textarea
                  name="notes"
                  className="w-full"
                  defaultValue={data?.data?.[0]?.notes?.plain || ''}
                  placeholder="Add notes about how you use this pedal, and any settings you like." />
                <Button type="submit" className="btn btn-outline">Save Notes</Button>
              </form>
            </section>
          </div>

        </div>
      )}
    </div >
  )
}

export { MyPedal }
