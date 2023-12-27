"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Fullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      if (fullscreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }, [fullscreen]);
  return (
    <div className="text-gray-800 md:hidden font-bold">
      {fullscreen ? (
        <ArrowsPointingInIcon
          className="h-8"
          onClick={() => setFullscreen(false)}
        />
      ) : (
        <ArrowsPointingOutIcon
          className="h-8"
          onClick={() => {
            setFullscreen(true);
          }}
        />
      )}
    </div>
  );
}
