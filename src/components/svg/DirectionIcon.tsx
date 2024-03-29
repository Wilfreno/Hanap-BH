import { SVGProps } from "react";

export default function DirectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg
        {...props}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="directionsRightIconTitle"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="#000000"
      >
        <title id="directionsRightIconTitle">Turn Right</title>{" "}
        <path d="M15 11H12C12 11 10 11 10 13.2C10 14 10 15 10 15" />{" "}
        <path d="M13 13L15 11L13 9" />{" "}
        <rect
          width="14.1422"
          height="14.1422"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 12 2)"
        />{" "}
      </svg>
    </>
  );
}
