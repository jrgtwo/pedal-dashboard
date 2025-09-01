import { Outlet } from "react-router";
import { AddGear } from "./AddGear"
import { GearBreadcrumbs } from "./GearBreadcrumbs"
import { useParams } from "react-router";
import { crumbOptions } from "./GearBreadcrumbs";

const MyGearLayout = () => {

  const params = useParams();
  const page = !params?.type
    ? crumbOptions.all
    : params?.type === 'pedals'
      ? crumbOptions.pedals
      : params?.type === 'boards'
        ? crumbOptions.boards
        : crumbOptions.all

  return (
    <>
      <section className="flex gap-16 mt-4 mb-4">
        <GearBreadcrumbs page={page} subpage={''} />
        <AddGear />
      </section>
      <Outlet />
    </>
  );
}

export { MyGearLayout }
