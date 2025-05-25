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
    <section role="section"
      className="w-full">
      <input
        type="text"
        value={name || ''}
        placeholder="Untitled Pedal Board"
        name="board-name"
        onChange={handleChange}
        className="text-2xl font-[Bebas_Neue]" />
      <Header />
      <Sandbox />
    </section >
  )
}

export { PedalBoardSandBox }
