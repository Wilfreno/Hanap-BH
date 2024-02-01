import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

export default function MainPagination({
  page_count,
  page,
  setPage,
}: {
  page_count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const [page_lever, setPageLever] = useState(0);
  const [page_select_control, setPageSelectControl] = useState(0);

  return (
    <section className="flex items-center justify-center">
      <Button
        disabled={page === 1}
        variant="link"
        onClick={() => {
          if (page_select_control > 0) setPageSelectControl((prev) => prev - 1);
          setPage((prev) => prev - 1);
          if (page_select_control <= 0) {
            setPageLever((prev) => prev - 1);
          }
        }}
      >
        <ChevronLeftIcon className="h-5 w-auto" />
      </Button>
      {Array.from({ length: 3 }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 + page_lever ? "secondary" : "ghost"}
          onClick={() => {
            setPage(index + 1 + page_lever);
            setPageSelectControl(index);
          }}
        >
          <p className={page === index + 1 + page_lever ? "font-bold " : ""}>
            {index + 1 + page_lever}
          </p>
        </Button>
      ))}
      <Button
        disabled={page === page_count}
        variant="link"
        onClick={() => {
          if (page_select_control < 2) setPageSelectControl((prev) => prev + 1);
          setPage((prev) => prev + 1);

          if (page_select_control === 2) setPageLever((prev) => prev + 1);
        }}
      >
        <ChevronRightIcon className="h-5 w-auto" />
      </Button>
    </section>
  );
}
