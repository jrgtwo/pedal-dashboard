import { useCallback } from 'react'
import { API } from "../../../../../../api/api"
import { usePedalStore } from "../Sandbox/store/pedal"
import { useLoginStore } from '../../../../../../store/login'
import type { UpdateBoardShape } from '../Pedal/Pedal.types'
const Header = () => {
  const user = useLoginStore((state) => state.user)
  const pedals = usePedalStore((state) => state.pedals)
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)
  const boardName = usePedalStore((state) => state.name)
  const boardId = usePedalStore((state) => state.boardId)

  const saveBoard = useCallback(async () => {
    if (!user || !pedals) return

    const toSave: UpdateBoardShape = {
      board: pedals,
    };
    if (boardName) {
      toSave.name = boardName
    }

    if (boardId) {
      toSave.id = parseInt(boardId, 10)
    }

    const { data, error } = await API.pedalBoard.saveBoard(toSave)

    if (error) {
      console.log(error)
      return
    }

    // Do something after saving
    console.log(data)
  }, [pedals, user, boardName, boardId])

  return (
    <header
      className="bg-zinc-300">
      <menu
        role="menu"
        className="flex flex-row justify-end mb-5">
        <li
          className="text-zinc-600 font-black px-2 py-1 hover:text-zinc-900">
          <button
            onClick={() => saveBoard()}>Save</button>
        </li>
        <li
          className="text-zinc-600 font-black px-2 py-1 hover:text-zinc-900">
          <button
            onClick={() => undoHistory()}>Undo {history.length}</button>
        </li>
        <li
          className="text-zinc-600 font-black px-2 py-1 hover:text-zinc-900">
          <button
            onClick={(event) => {
              event.preventDefault();
              clear()
            }}>Clear</button></li>
      </menu>
    </header>
  )
}

export { Header }
