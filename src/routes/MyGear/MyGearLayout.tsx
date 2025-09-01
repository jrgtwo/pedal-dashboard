import { Outlet } from "react-router";
import { AddGear } from "./AddGear"
import { GearBreadcrumbs } from "./GearBreadcrumbs"

const MyGearLayout = () => (
  <>
    <section className="flex gap-16 mt-4 mb-4">
      <GearBreadcrumbs />
      <AddGear />
    </section>
    <Outlet />
  </>
)

export { MyGearLayout }
