import { useParams } from "react-router"

const MyPedal = () => {
  const { pedalId } = useParams<{ pedalId: string }>()
  return (
    <div>
      <h2>My Pedal, {pedalId}</h2>
      <p>This is a placeholder for the My Pedal page.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export { MyPedal }
