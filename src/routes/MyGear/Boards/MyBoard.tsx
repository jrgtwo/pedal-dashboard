import { useGetMyBoard, useSaveMyBoard } from "../../../queryHooks/myGear/boards/useGetMyBoard"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useEffect } from "react"
import { MyGearDisplay } from "../MyGearDisplay"

const MyBoard = ({ userGearId: userBoardId }: { userGearId: string | undefined, gearId?: string, name?: string }) => {

  const mutation = useSaveMyBoard()

  const onSubmitSaveNotes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const notes = formData.get('notes') as string
    mutation.mutate({ id: Number(userBoardId), notes })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Board updates saved successfully!')
    }
  }, [mutation.isSuccess])

  const { isLoading, isSuccess, isError, data } = useGetMyBoard(Number(userBoardId))
  const boardData = data?.[0]

  return (
    <div>
      <h2 className="text-4xl font-heading py-4">My Board</h2>
      <Separator />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading board data.</p>}

      {isSuccess && data && (
        <MyGearDisplay data={boardData} onSubmitSaveNotes={onSubmitSaveNotes} gearType="boards" />
      )}
    </div >
  )
}

export { MyBoard }
