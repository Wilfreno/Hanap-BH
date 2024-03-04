import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
export default function HostingPlaceName() {
  const path_name = usePathname();
  const router = useRouter();

  return (
    <motion.div
      key={"name"}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="flex flex-col h-full w-full space-y-20"
    >
      <h1 className="text-2xl font-bold mx-auto ">Name Your Place</h1>

      <Input
        placeholder="Name Your Place"
        className="text-base h-[8svh] "
        id="name"
      />
      <Button
        className="ml-auto text-base font-semibold"
        type="button"
        onClick={() => router.replace(`${path_name}?form=address`)}
      >
        Next <ChevronRightIcon className="h-5 ml-2 w-auto" />
      </Button>
    </motion.div>
  );
}
