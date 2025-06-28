import { useCallback, useEffect } from 'react'
import { usePedalStore } from "../Sandbox/store/pedal"
import { useLoginStore } from '../../../../../../store/login'
import type { UpdateBoardShape } from '../Pedal/Pedal.types'
import { useSaveBoard } from '../../../../../../queryHooks/pedalBoard/useSaveBoard'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas-pro';

const Header = () => {
  const user = useLoginStore((state) => state.user)
  const pedals = usePedalStore((state) => state.pedals)
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)
  const boardName = usePedalStore((state) => state.name)
  const boardId = usePedalStore((state) => state.boardId)
  const { mutation } = useSaveBoard()

  const saveBoard = useCallback(async () => {
    if (!user || !pedals) return

    const toSave: UpdateBoardShape = {
      board: JSON.stringify(pedals || {}),
    };
    if (boardName) {
      toSave.name = boardName
    }

    if (boardId) {
      toSave.id = boardId
    }

    toSave.snapshot = null;

    try {
      const canvas = await html2canvas(document.getElementById('pedal-dashboard-sandbox') as HTMLElement)
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1))
      const blobImg = URL.createObjectURL(blob as Blob)

      toSave.snapshot = blobImg || null

    } catch (error) {
      console.error('Error capturing canvas:', error);
      toast.error('Failed to capture board image.')
    }

    mutation.mutate(toSave)
  }, [pedals, user, boardName, boardId, mutation])

  useEffect(() => {
    if (mutation.isSuccess) {
      toast('Board saved successfully!')
    }
  }, [mutation.isSuccess])



  return (
    <header
      className="bg-zinc-300">
      <menu
        role="menu"
        className="flex m-auto my-2 flex-row justify-end align-center">
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            onClick={() => saveBoard()}>Save</Button>
        </li>
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            variant="secondary"
            onClick={() => undoHistory()}>Undo {history.length}</Button>
        </li>
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            variant='destructive'
            onClick={(event) => {
              event.preventDefault();
              clear()
            }}>Clear</Button></li>
      </menu>
    </header>
  )
}

export { Header }
