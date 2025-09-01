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

const GearBreadcrumbs = ({ page, subpage }: { page?: crumbOptions | undefined, subpage?: string }) => {
  const pageLink = page && page !== crumbOptions.all ? `/my-gear/${page}` : '/my-gear'

  return (
    <Breadcrumb>
      <BreadcrumbList className={"flex flex-row gap-2 items-center justify-start "}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/my-gear" className={" text-4xl font-heading"}>My Gear</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage className={" text-2xl font-heading"}>
          <BreadcrumbLink asChild>
            <Link to={pageLink} className={" text-2xl font-heading"}>
              {
                page
                  ? crumbComponents?.[page]
                  : crumbComponents.all
              }
            </Link>
          </BreadcrumbLink>
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { GearBreadcrumbs };
