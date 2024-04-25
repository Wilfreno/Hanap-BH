export default function FetchingSkeleton() {
  return (
    <section className="w-full flex flex-col items-center space-y-3 justify-center my-5">
      <div className=" bg-muted-foreground h-2 w-full rounded-full animate-pulse"></div>
      <div className=" bg-muted-foreground h-1 w-4/5 rounded-full animate-pulse"></div>
    </section>
  );
}
