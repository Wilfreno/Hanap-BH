import { cn } from "@/lib/utils";

export default function FetchingSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div
            key={index}
            className={cn(
              "w-screen rounded-sm sm:w-[20vw] sm:rounded-lg h-fit shadow-md sm:shadow-none bg-background",
              `opacity-${Math.floor((1 / (index + 1)) * 10) * 10}`
            )}
          >
            <div className="relative overflow-hidden w-full h-auto rounded-lg flex ">
              <span className="w-full h-[5dvh] rounded-t-sm sm:rounded-t-lg bg-muted-foreground animate-pulse" />
            </div>
            <div className="p-1 flex flex-col justify-between">
              <div className="space-y-2 mt-3">
                <div className="bg-muted-foreground h-2 w-4/5 rounded-full animate-pulse"></div>
                <div className="bg-muted-foreground h-1 w-2/3 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
