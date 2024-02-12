import useNearbyPlacesAPI from "@/components/hooks/useNearbyPlacesAPI";
import Spinner from "@/components/svg/loading/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function MainPagination({
  page_count,
  page,
  setPage,
  next,
}: {
  page_count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  next: () => Promise<void>;
}) {
  const [page_lever, setPageLever] = useState(0);
  const [page_select_control, setPageSelectControl] = useState(0);
  const [fetching, setFetching] = useState(false);
  async function getNextPage() {
    setFetching(true);
    await next();
    setFetching(false);
  }
  useEffect(() => {
    if (page === page_count) {
      getNextPage();
    }
  }, [page]);

  return (
    <>
      <section className="flex items-center justify-center mx-auto">
        {page_count > 3 && (
          <Button
            disabled={page === 1 || page_count <= 0}
            variant="link"
            onClick={() => {
              if (page_select_control > 0)
                setPageSelectControl((prev) => prev - 1);
              setPage((prev) => prev - 1);
              if (page_select_control <= 0) {
                setPageLever((prev) => prev - 1);
              }
            }}
          >
            <ChevronLeftIcon className="h-6 w-auto" />
          </Button>
        )}
        {Array.from({ length: page_count > 3 ? 3 : page_count }).map(
          (_, index) => (
            <Button
              disabled={page_count <= 0}
              key={index}
              variant={page === index + 1 + page_lever ? "default" : "ghost"}
              onClick={() => {
                setPage(index + 1 + page_lever);
                setPageSelectControl(index);
              }}
            >
              <p
                className={cn(
                  " text-base",
                  page === index + 1 + page_lever ? "font-bold " : ""
                )}
              >
                {index + 1 + page_lever}
              </p>
            </Button>
          )
        )}
        {page_count > 3 && (
          <Button
            disabled={page === page_count || page_count <= 0 || fetching}
            variant="link"
            onClick={() => {
              if (page_select_control < 2)
                setPageSelectControl((prev) => prev + 1);
              setPage((prev) => prev + 1);

              if (page_select_control === 2) setPageLever((prev) => prev + 1);
            }}
          >
            {fetching ? (
              <Spinner className="h-4 w-auto" />
            ) : (
              <ChevronRightIcon className="h-6 w-auto" />
            )}
          </Button>
        )}
      </section>
      <div className="flex items-center space-x-2 absolute right-5 bottom-2">
        <Button disabled size="sm" variant="outline" className="text-xs">
          {page}
        </Button>
        <p className="text-sm">of</p>
        <Button
          onClick={() => {
            setPage(page_count);
            if (page_count > 3) setPageLever(page_count - 3);
          }}
        >
          {fetching ? (
            <Spinner className="h-4 w-auto fill-background" />
          ) : page_count ? (
            page_count
          ) : (
            0
          )}
        </Button>
      </div>
    </>
  );
}
