import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <section className="fixed w-screen h-screen bg-[rgba(0,0,0,.5)] z-50 flex items-center justify-center">
      {children}
    </section>
  );
}
