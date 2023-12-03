export default function NearbyLoadingSkeleton() {
  return (
    <>
      <div className="flex overflow-x-auto scrollbar-hide">
        {Array.from({ length: 4 }).map((i, index) => (
          <li
            key={index}
            className="flex flex-col mx-3 space-y-3 justify-between"
          >
            <div className="aspect-video h-40 w-auto rounded-lg bg-gray-600 animate-pulse sm:h-80"></div>
            <div
              className="w-3/4 bg-gray-500 animate-pulse h-3 rounded-lg"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: "1s",
              }}
            ></div>
            <div
              className="w-1/5 bg-gray-500 animate-pulse h-3 rounded-lg"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: "1s",
              }}
            ></div>
          </li>
        ))}
      </div>
    </>
  );
}
