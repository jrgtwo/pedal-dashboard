import { Menu } from './components/Menu/Menu'
import { PedalBoardSandBox } from './components/PedalBoardSandBox/PedalBoardSandBox'
import { usePedalStore } from './components/PedalBoardSandBox/components/Sandbox/store/pedal'

const Create = () => {
  const clear = usePedalStore((state) => state.clear)
  clear()

  return (
    <section>

      <section
        className="flex flex-row mt-5">
        <Menu />
        <PedalBoardSandBox />
      </section>
    </section>
  )
}

export { Create }
