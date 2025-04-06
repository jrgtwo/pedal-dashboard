import { useCallback } from 'react'
import { API } from "../../../../../../api/api"
import { usePedalStore } from "../Sandbox/store/pedal"
import { useLoginStore } from '../../../../../../store/login'
const Header = () => {
  const user = useLoginStore((state) => state.user)
  const pedals = usePedalStore((state) => state.pedals)
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)

  const saveBoard = useCallback(async () => {
    if (!user?.id || !pedals) return

    const { data, error } = await API.saveBoard({
      board: pedals,
    })

    if (error) {
      console.log(error)
      return
    }
    // Do something after saving
  }, [pedals, user?.id])

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
