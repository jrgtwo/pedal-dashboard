import { usePedalStore } from "../Sandbox/store/pedal"
const Header = () => {
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)

  return (
    <header
      className="bg-zinc-300">
      <menu
        role="menu"
        className="flex flex-row justify-end mb-5">
        <li
          className="text-zinc-600 font-black px-2 py-1 hover:text-zinc-900">
          <button>Save</button>
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
