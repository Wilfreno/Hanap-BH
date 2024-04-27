export default function MainListSkeleton() {
  return (
    <section className="grow grid grid-cols-1 sm:grid-cols-4 sm:items-center sm:justify-between gap-10 mx-5 sm:mx-[10vw] my-[10dvh] h-fit">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full h-auto">
          <div className="relative overflow-hidden w-full h-auto rounded-lg flex">
            <div className="aspect-square w-full h-auto rounded-t-sm sm:rounded-t-lg bg-muted-foreground animate-pulse" />
          </div>
          <div className="p-1 flex flex-col justify-between">
            <div className="space-y-2 mt-3">
              <div className="bg-muted-foreground h-5 w-4/5 rounded-full animate-pulse"></div>
              <div className="bg-muted-foreground h-3 w-2/3 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
