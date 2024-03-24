export default function FetchingSkeleton() {
  return (
    <section className="w-full flex flex-col items-center space-y-3 justify-center px-20 py-10">
      <div className=" bg-muted-foreground h-3 w-full rounded-full animate-pulse"></div>
      <div className=" bg-muted-foreground h-2 w-4/5 rounded-full animate-pulse"></div>
    </section>
  );
}
