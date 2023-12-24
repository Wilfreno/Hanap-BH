import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.2)] z-50 flex justify-center">
      {children}
    </section>
  );
}
