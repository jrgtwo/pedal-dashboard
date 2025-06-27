import { useCallback, type ChangeEvent } from 'react'
import './PedalBoardSandBox.css'
import { Header } from './components/Header/Header'
import { Sandbox } from './components/Sandbox/Sandbox'
import { usePedalStore } from './components/Sandbox/store/pedal'

const PedalBoardSandBox = () => {
  const name = usePedalStore((store) => store.name)
  const updateBoardName = usePedalStore((store) => store.updateBoardName)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    updateBoardName(val)
  }, [updateBoardName])

  return (
    <section role="section" className="w-full">
      <section className="mb-4 flex margin-auto justify-between align-center">
        <input
          type="text"
          value={name || ''}
          placeholder="Untitled Pedal Board"
          name="board-name"
          onChange={handleChange}
          className="border-2 text-2xl font-heading w-full pl-4" />
        <Header />
      </section>
      <Sandbox />
    </section >
  )
}

export { PedalBoardSandBox }
