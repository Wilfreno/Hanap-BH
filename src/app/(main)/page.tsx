"use client";
import MainContent from "@/components/page/main/MainContent";
import MainFilter from "@/components/page/main/filter/MainFilter";
export default function page() {
  return (
    <main>
      <MainFilter />
      <MainContent />
    </main>
  );
}
