import Link from "next/link";
export default function AddPlace() {
  return (
    <Link
      href="/hosting"
      as="/hosting"
      prefetch={true}
      className="items-center hidden lg:inline-flex whitespace-nowrap font-bold text-muted-foreground text-sm hover:drop-shadow-lg mr-20"
    >
      Add your place
    </Link>
  );
}
