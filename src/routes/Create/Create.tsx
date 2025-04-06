import { useEffect } from 'react'
import { Menu } from './components/Menu/Menu'
import { PedalBoardSandBox } from './components/PedalBoardSandBox/PedalBoardSandBox'
import { usePedalStore } from './components/PedalBoardSandBox/components/Sandbox/store/pedal'

const Create = () => {
  const clear = usePedalStore((state) => state.clear)
  useEffect(() => {
    console.log('create!')
    clear()
  }, [clear])
  return (
    <section>
      <h2>Create Your New Pedalboard</h2>
      <section
        className="flex flex-row mt-5">
        <Menu />
        <PedalBoardSandBox />
      </section>
    </section>
  )
}

export { Create }
