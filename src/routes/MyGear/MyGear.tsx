import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { Separator } from "@/components/ui/separator"

const MyGear = () => {
  const { data } = useGetMyPedals()
  const { pedalList } = useGetAllPedals()

  return (
    <>
      <h2 className="text-4xl font-[bebas_neue]">My Gear</h2>
      <Separator />
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <Separator />

        <section className="flex flex-col">
          <h3 className="text-2xl font-[bebas_neue]">My Pedals</h3>
          {data?.data && data?.data.map((userPedalId) => {
            const linkedPedal = pedalList?.find((pedal) => {
              return parseInt(userPedalId.pedal_id, 10) === pedal.id
            })
            if (!linkedPedal) return null
            return (
              <Fragment key={userPedalId.id}>
                <Link
                  to={`/my-gear/pedals/${userPedalId.id}/${linkedPedal.id}/${encodeURIComponent(linkedPedal.name.replace(/ /g, '-'))}`}>
                  <img width="50" src={`/src/assets/${linkedPedal.img}`} /><span>{linkedPedal.name}</span>
                </Link>
                <Separator />
              </Fragment>
            )
          })}
        </section>
      </div>
    </>
  )
}

export { MyGear }
