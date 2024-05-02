import { Card, CardContent } from "../ui/card";

export default function LodgingCardSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Card
      key={index}
      className="cursor-pointer border-none shadow-none w-[20rem]"
    >
      <CardContent>
        <div className="w-full h-auto rounded-lg flex">
          <div className="aspect-square w-full h-auto rounded-lg bg-muted-foreground animate-pulse" />
        </div>
        <div className="p-1 flex flex-col justify-between">
          <div className="space-y-2 mt-3">
            <div className="bg-muted-foreground h-5 w-4/5 rounded-full animate-pulse"></div>
            <div className="bg-muted-foreground h-3 w-2/3 rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
