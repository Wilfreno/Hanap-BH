import Image from "next/image";
import loading from "../../../public/Ripple-1.3s-200px.svg";
export default function LoadingFallback() {
  return (
    <div className="h-screen w-screen bg-[rgba(0,0,0,.7)] z-50 flex items-center justify-center">
      <div className="aspect-square h-20 w-auto relative overflow-hidden">
        <Image
          src={loading}
          alt="loading"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
