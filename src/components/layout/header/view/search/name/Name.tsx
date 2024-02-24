import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
export default function Name() {
  return (
    <>
      <div>
        <Label className="text-xs font-bold mx-3">Search Housing Name</Label>
        <Input
          autoFocus
          className="border-none focus-visible:ring-0 shadow-none w-[25rem] text-base"
        />
      </div>
      <div className="bg-primary w-fit rounded-full ml-2">
        <MagnifyingGlassIcon className="h-4 w-auto rounded-full text-background m-2" />
      </div>
    </>
  );
}
