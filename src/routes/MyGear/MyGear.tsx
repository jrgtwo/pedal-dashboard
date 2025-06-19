import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { Separator } from "@/components/ui/separator"
import { AddGear } from "./AddGear"
import { API } from "@/api/api"

const MyGear = () => {
  useGetMyPedals()
  const data = API.gear.store((state) => state.myPedals)

  console.log('My Gear', data)

  return (
    <>
      <h2 className="text-4xl font-[bebas_neue]">My Gear</h2>
      <AddGear />
      <Separator />
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <Separator />

        <section className="flex flex-col">
          <h3 className="text-2xl font-[bebas_neue]">My Pedals</h3>
          {data && data?.map((pedal) => {
            return (
              <Fragment key={pedal?.pedals?.id || pedal?.pedal_id}>
                <Link
                  to={`/my-gear/pedals/${pedal?.id}/${pedal?.pedals?.id}/${encodeURIComponent(pedal?.pedals?.name.replace(/ /g, '-'))}`}>
                  <img width="50" src={`/src/assets/${pedal?.pedals?.img}`} />
                  <span>{pedal?.pedals?.name}</span>
                  <p>{pedal.title}</p>
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
