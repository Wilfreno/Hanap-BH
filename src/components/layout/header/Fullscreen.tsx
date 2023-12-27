"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Fullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="text-gray-800 md:hidden font-bold">
      {fullscreen ? (
        <ArrowsPointingInIcon
          className="h-8"
          onClick={() => {
            setFullscreen(false);
            document.documentElement.requestFullscreen();
          }}
        />
      ) : (
        <ArrowsPointingOutIcon
          className="h-8"
          onClick={() => {
            setFullscreen(true);
            document.exitFullscreen();
          }}
        />
      )}
    </div>
  );
}
