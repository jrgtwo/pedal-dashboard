import { useGetMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { useSaveMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"
import { PedalShape } from "@/routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useEffect } from "react"
import { MyGearDisplay } from "../MyGearDisplay"

const MyPedal = ({ userGearId: userPedalId }: { userGearId: string | undefined, gearId?: string, name?: string }) => {

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
  const pedalInfo = data?.data?.[0]

  return (
    <div>
      <h2 className="text-4xl font-heading py-4">My Pedal</h2>
      <Separator />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading pedal data.</p>}

      {isSuccess && data && (
        <MyGearDisplay data={pedalInfo} onSubmitSaveNotes={onSubmitSaveNotes} />
      )}
    </div >
  )
}

export { MyPedal }
