import Link from "next/link";

export default function MainFilter({ page_params }: { page_params: string }) {
  const pages = [
    {
      title: "Nearby",
      page: "nearby",
    },
    {
      title: "Best prices",
      page: "best-prices",
    },
    {
      title: "Highest rate",
      page: "ratings",
    },
    {
      title: "Availalbe rooms",
      page: "rooms",
    },
    {
      title: "Gender restriction",
      page: "restrictionl",
    },
  ];
  return (
    <div className="flex items-center justify-center my-5 overflow-x-auto border-b whitespace-nowrap">
      {pages.map((page) => (
        <Link
          href={page.page}
          as={page.page}
          prefetch
          className={`text-xl font-semibold text-gray-700 mx-5 ${page_params === page.page ? "border-b-2 border-gray-900" : ""}`}
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
}
