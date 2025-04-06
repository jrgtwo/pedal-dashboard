import { useCallback } from 'react'
import './PedalBoardSandBox.css'
import { Header } from './components/Header/Header'
import { Sandbox } from './components/Sandbox/Sandbox'
import { usePedalStore } from './components/Sandbox/store/pedal'

const PedalBoardSandBox = () => {

  const saveBoardName = usePedalStore((store) => store.saveBoardName)

  const handleChange = useCallback((event) => {
    const val = event.currentTarget.value
    saveBoardName(val)
  }, [saveBoardName])

  return (
    <section role="section"
      className="w-full">
      <input
        type="text"
        placeholder="Untitled"
        name="board-name"
        onChange={handleChange}
        className="font-black text-2xl" />
      <Header />
      <Sandbox />
    </section >
  )
}

export { PedalBoardSandBox }
