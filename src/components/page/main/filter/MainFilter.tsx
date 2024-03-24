import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import HouseTypeFilter from "./HouseTypeFIiter";

export default function MainFilter() {
  return (
    <section className="flex items-center space-x-5 mx-auto w-fit border rounded-full bg-background  my-5 px-5 py-1 ">
      <HouseTypeFilter />

      <AdjustmentsHorizontalIcon className="h-5 w-auto" />
    </section>
  );
}
