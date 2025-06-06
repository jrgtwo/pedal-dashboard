import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const MyGear = () => {
  const { data } = useGetMyPedals()

  return (
    <>
      <h2 className="text-4xl font-[bebas_neue]">My Gear</h2>

      <Separator />
      <Button className="my-4" variant="outline" asChild>
        <Link to="/my-gear/add-gear">Add Gear</Link>
      </Button>
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <Separator />

        <section className="flex flex-col">
          <h3 className="text-2xl font-[bebas_neue]">My Pedals</h3>
          {data?.data && data?.data.map((pedal) => {
            return (
              <Fragment key={pedal.pedals.id}>
                <Link
                  to={`/my-gear/pedals/${pedal.pedals.id}/${pedal.pedals.id}/${encodeURIComponent(pedal.pedals.name.replace(/ /g, '-'))}`}>
                  <img width="50" src={`/src/assets/${pedal.pedals.img}`} /><span>{pedal.pedals.name}</span>
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
