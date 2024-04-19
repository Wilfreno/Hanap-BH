import Spinner from "@/components/svg/loading/Spinner";

export default function loading() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen grid bg-[rgba(0,0,0,0.2)] place-items-center">
      <Spinner className="h-50 fill-primary text-primary" />
    </div>
  );
}
