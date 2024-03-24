import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AddPlace() {
  const path_name = usePathname();

  return (
    <Link
      href={`/hosting?exit=${path_name}&url_callback=/hosting`}
      as={`/hosting?exit=${path_name}&url_callback=/hosting`}
      prefetch={true}
      className="items-center hidden lg:inline-flex whitespace-nowrap font-bold text-muted-foreground text-sm hover:drop-shadow-lg mr-20"
    >
      Add your place
    </Link>
  );
}
