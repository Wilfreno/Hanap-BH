"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Fullscreen() {
  const [isfullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    async function fullscreen() {
      if (isfullscreen) {
        await document.documentElement.requestFullscreen();
        return;
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    }

    if (document) fullscreen();
  }, [isfullscreen]);
  return (
    <div className="flex items-center justify-center py-2 md:hidden">
      <span
        className="flex items-center space-x-5"
        onClick={() => {
          setFullscreen((prev) => !prev);
        }}
      >
        <p>Fullscreen</p>
        {isfullscreen ? (
          <ArrowsPointingInIcon className="h-5" />
        ) : (
          <ArrowsPointingOutIcon className="h-5" />
        )}
      </span>
    </div>
  );
}
