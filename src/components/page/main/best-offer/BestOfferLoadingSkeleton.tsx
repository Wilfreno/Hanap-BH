import React from "react";

export default function BestOfferLoadingSkeleton() {
  return (
    <section className="flex flex-col sm:flex-row justify-evenly">
      {Array.from({ length: 4 }).map((i, index) => (
        <div
          key={index}
          className="flex flex-col shadow-lg rounded-lg space-y-5 py-3 mx-5"
        >
          <div className="aspect-square h-auto w-full rounded-lg bg-gray-600 animate-pulse sm:w-[22vw]"></div>
          <div
            className="w-3/4 bg-gray-600 animate-pulse h-3 rounded-lg"
            style={{
              animationDelay: "0.5s",
              animationDuration: "1s",
            }}
          ></div>
          <div
            className="w-3/4 bg-gray-600 animate-pulse h-3 rounded-lg"
            style={{
              animationDelay: "0.5s",
              animationDuration: "1s",
            }}
          ></div>
        </div>
      ))}
    </section>
  );
}
