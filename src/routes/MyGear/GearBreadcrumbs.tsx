import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

const GearBreadcrumbs = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className={"flex flex-row gap-2 items-center justify-start "}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/my-gear" className={" text-4xl font-heading"}>My Gear</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className={" text-2xl font-heading"}>Pedals</BreadcrumbPage>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Pedal Details</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { GearBreadcrumbs };
