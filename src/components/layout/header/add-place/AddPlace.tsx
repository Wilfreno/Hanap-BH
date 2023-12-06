import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
export default function AddPlace() {
  return (
    <Link
      href="/hosting"
      as="/hosting"
      className="hidden md:inline-flex items-center space-x-2 whitespace-nowrap "
    >
      <p className="text-xs lg:text-base">Add Your boarding House</p>
      <PlusIcon className="hidden lg:inline-flex h-5 text-gray-950 lg:h-4" />
    </Link>
  );
}
