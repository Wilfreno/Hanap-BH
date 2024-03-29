"use client";
import FetchingSkeleton from "@/components/loading-skeleton/FetchingSkeleton";

export default function page() {
  return (
    <section className="h-screen w-screen flex justify-center bg-background">
      <FetchingSkeleton />
    </section>
  );
}
