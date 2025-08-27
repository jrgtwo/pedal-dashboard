import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

export enum crumbOptions {
  all = 'all',
  boards = 'boards',
  pedals = 'pedals',
}
const crumbText = {
  all: 'All Gear',
  boards: 'Boards',
  pedals: 'Pedals',
}

const crumbComponents = {
  all: <BreadcrumbPage className={" text-2xl font-heading"}>{crumbText[crumbOptions.all]}</BreadcrumbPage>,
  boards: <BreadcrumbPage className={" text-2xl font-heading"}>{crumbText[crumbOptions.boards]}</BreadcrumbPage>,
  pedals: <BreadcrumbPage className={" text-2xl font-heading"}>{crumbText[crumbOptions.pedals]}</BreadcrumbPage>,
}

const GearBreadcrumbs = ({ crumb }: { crumb?: keyof typeof crumbOptions }) => {

  return (
    <Breadcrumb>
      <BreadcrumbList className={"flex flex-row gap-2 items-center justify-start "}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/my-gear" className={" text-4xl font-heading"}>My Gear</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {
          crumb && crumbComponents?.[crumb]
            ? crumbComponents?.[crumb]
            : crumbComponents.all
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { GearBreadcrumbs };
