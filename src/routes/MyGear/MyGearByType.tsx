import { MyGearBoardsList } from "./MyGearBoardsList"
import { MyGearPedalsList } from "./MyGearPedalsList";
import { useParams } from "react-router"
import { crumbOptions } from "./GearBreadcrumbs";

const MyGearByType = () => {

  const params = useParams();
  const PageComponent = params?.type === crumbOptions.pedals
    ? MyGearPedalsList
    : params?.type === crumbOptions.boards
      ? MyGearBoardsList
      : null;

  return (
    <section>
      <h2>My Boards</h2>
      {PageComponent?.()}
    </section>
  )
}

export { MyGearByType }
