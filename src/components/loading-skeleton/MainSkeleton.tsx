import { cn } from "@/lib/utils";

export default function MainSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-4 sm:items-center sm:grow gap-[5vh]">
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div
            key={index}
            className={cn(
              "w-[18rem] h-auto shadow-sm rounded-lg",
              `opacity-${Math.floor((1 / (index + 1)) * 10) * 10}`
            )}
          >
            <div className="relative overflow-hidden w-full h-auto rounded-lg flex ">
              <span className="aspect-square w-full h-auto rounded-lg bg-muted-foreground animate-pulse" />
            </div>
            <div className="p-1 h-[20vh] flex flex-col justify-between">
              <div className="space-y-2 mt-3">
                <div className="bg-muted-foreground h-5 w-4/5 rounded-full animate-pulse"></div>
                <div className="bg-muted-foreground h-3 w-2/3 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span className="bg-muted-foreground h-3 w-10 rounded-full animate-pulse"></span>
                <span className="bg-muted-foreground h-3 w-5 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
