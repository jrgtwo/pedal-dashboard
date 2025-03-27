import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'
const mockPedal = {
  id: 3,
  name: 'bmp',
  brand: '-',
  img: 'bmp.png',
  location: {
    w: 192,
    h: 253,
    x: 450,
    y: 200
  }
}
const Menu = () => {

  const addNewPedal = usePedalStore((state) => state.addNewPedals)

  return (
    <section
      className="w-1/4">
      <h4
        className="font-black">Options</h4>
      <menu role="menu"
        className="mt-5">
        <li>
          <button>Boards v</button>
        </li>
        <li>
          <button onClick={() => addNewPedal(mockPedal)}>Pedals v</button>
        </li>
      </menu>
    </section>
  )
}

export { Menu }
