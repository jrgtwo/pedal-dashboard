import './PedalBoardSandBox.css'
import { Header } from './components/Header/Header'
import { Sandbox } from './components/Sandbox/Sandbox'

const PedalBoardSandBox = () => {
  return (
    <section role="section"
      className="w-full">
      <Header />
      <Sandbox />
    </section >
  )
}

export { PedalBoardSandBox }