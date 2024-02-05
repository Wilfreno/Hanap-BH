import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
export default function AddPlace() {
  return (
    <Link
      href="/hosting"
      as="/hosting"
      prefetch={true}
      className="items-center hidden space-x-2 lg:inline-flex whitespace-nowrap "
    >
      <p className="text-xs lg:text-base">Add Your boarding House</p>
    </Link>
  );
}
