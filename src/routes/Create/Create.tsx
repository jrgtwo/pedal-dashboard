import { Separator } from '@/components/ui/separator'
import { Menu } from './components/Menu/Menu'
import { PedalBoardSandBox } from './components/PedalBoardSandBox/PedalBoardSandBox'
import { usePedalStore } from './components/PedalBoardSandBox/components/Sandbox/store/pedal'

const Create = () => {
  const clear = usePedalStore((state) => state.clear)
  clear()

  return (
    <section>
      <section className="flex flex-row items-center gap-8">
        <h2 className="my-4 text-4xl font-[Bebas_Neue]">Pedalboard Creator</h2>
        <Menu />
      </section>
      <Separator className="mb-8" />
      <section
        className="flex flex-row mt-5">

        <PedalBoardSandBox />
      </section>
    </section >
  )
}

export { Create }
