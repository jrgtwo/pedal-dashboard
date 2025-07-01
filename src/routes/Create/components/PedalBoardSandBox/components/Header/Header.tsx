
import { usePedalStore } from "../Sandbox/store/pedal"
import { Button } from '@/components/ui/button'
import { useToSave } from './hooks/useToSave'

const Header = () => {
  const history = usePedalStore((state) => state.history)
  const undoHistory = usePedalStore((state) => state.undoHistory)
  const clear = usePedalStore((state) => state.clear)
  const { saveBoard } = useToSave()

  return (
    <header
      className="bg-zinc-300">
      <menu
        role="menu"
        className="flex m-auto my-2 flex-row justify-end align-center">
        <li className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            onClick={saveBoard}>Save</Button>
        </li>
        <li className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
          <Button
            variant="secondary"
            onClick={undoHistory}>Undo {history.length}</Button>
        </li>
        <li className="text-zinc-600  px-2 py-1 hover:text-zinc-900">
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
