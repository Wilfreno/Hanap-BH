export default function MainFetchMobileSkeleton() {
  return (
    <div className="space-y-2 ">
      <div className="w-[90vw] rounded-full sm:hidden bg-muted-foreground h-3 animate-pulse mx-auto"></div>
      <div className="w-[70vw] rounded-full sm:hidden bg-muted-foreground h-2 animate-pulse mx-auto"></div>
    </div>
  );
}
