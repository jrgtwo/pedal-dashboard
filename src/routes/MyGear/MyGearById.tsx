import { MyBoard } from "./Boards/MyBoard";
import { MyPedal } from "./Pedals/MyPedal";

import { useParams } from "react-router"
import { crumbOptions } from "./GearBreadcrumbs";

const MyGearById = () => {
  const params = useParams();
  const PageComponent = params?.type === crumbOptions.pedals
    ? MyPedal
    : params?.type === crumbOptions.boards
      ? MyBoard
      : null;

  return (
    <section>
      {PageComponent?.({ userGearId: params?.userGearId, gearId: params?.gearId, name: params?.name })}
    </section>
  )
}

export { MyGearById }
