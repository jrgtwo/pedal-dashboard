import { useCallback, useEffect } from 'react'
import { usePedalStore } from "../Sandbox/store/pedal"
import { useLoginStore } from '../../../../../../store/login'
import type { UpdateBoardShape } from '../Pedal/Pedal.types'
import { useSaveBoard } from '../../../../../../queryHooks/pedalBoard/useSaveBoard'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'

const Header = () => {
  const user = useLoginStore((state) => state.user)
  const pedals = usePedalStore((state) => state.pedals)
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)
  const boardName = usePedalStore((state) => state.name)
  const boardId = usePedalStore((state) => state.boardId)
  const { mutation } = useSaveBoard()

  const saveBoard = useCallback(() => {
    if (!user || !pedals) return

    const toSave: UpdateBoardShape = {
      board: pedals,
    };
    if (boardName) {
      toSave.name = boardName
    }

    if (boardId) {
      toSave.id = boardId
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
        className="flex flex-row justify-end align-center mb-5">
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            onClick={() => saveBoard()}>Save</Button>
        </li>
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            onClick={() => undoHistory()}>Undo {history.length}</Button>
        </li>
        <li
          className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            onClick={(event) => {
              event.preventDefault();
              clear()
            }}>Clear</Button></li>
      </menu>
    </header>
  )
}

export { Header }
