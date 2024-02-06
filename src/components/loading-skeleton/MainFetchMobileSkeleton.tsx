export default function MainFetchMobileSkeleton() {
  return (
    <div className="space-y-1 ">
      <div className="w-[90vw] rounded-full sm:hidden bg-muted-foreground h-4 animate-pulse mx-auto"></div>
      <div className="w-[70vw] rounded-full sm:hidden bg-muted-foreground h-2 animate-pulse mx-auto"></div>
    </div>
  );
}
