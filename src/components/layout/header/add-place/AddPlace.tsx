import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
export default function AddPlace() {
  return (
    <Link
      href="/test"
      className="flex items-center space-x-2 whitespace-nowraplg:inline-flex"
    >
      <p>Add Your boarding House</p>
      <PlusIcon className="h-5 text-gray-950 lg:h-4" />
    </Link>
  );
}
