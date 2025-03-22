import { Menu } from './components/Menu/Menu'
import { PedalBoardSandBox } from './components/PedalBoardSandBox/PedalBoardSandBox'

const Create = () => {
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