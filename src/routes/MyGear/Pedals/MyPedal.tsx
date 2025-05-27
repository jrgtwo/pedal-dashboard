import { useParams } from "react-router"
import { useGetMyPedal } from "../../../queryHooks/myGear/pedals/useGetMyPedal"

const MyPedal = () => {
  const { userPedalId, pedalId } = useParams<{
    userPedalId: string,
    pedalId: string
  }>()

  const { isLoading, isSuccess, isError, data, status, refetch } = useGetMyPedal(Number(userPedalId))
  const pedalData = data?.data?.[0]?.pedals
  return (
    <div>
      <h2 className="text-2xl font-[bebas_neue]">My Pedal</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading pedal data.</p>}
      {isSuccess && data && (
        <div>
          <h3>{pedalData?.name}</h3>
          <p>Pedal ID: {data.data.pedal_id}</p>
          <p>Notes: {data.data.notes}</p>
          <img src={`/src/assets/${pedalData.img}`} alt={pedalData?.name} />
          {/* Add more pedal details as needed */}
        </div>
      )}
      <p>This is a placeholder for the My Pedal page.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export { MyPedal }
