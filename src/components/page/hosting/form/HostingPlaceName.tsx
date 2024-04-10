import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function HostingPlaceName({
  setFormIndex,
}: {
  setFormIndex: Dispatch<SetStateAction<number>>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const [name, setName] = useState("");
  return (
    <motion.div
      key={"name"}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="grid place-items-center h-full w-full space-y-20 p-20"
    >
      <h1 className="text-3xl font-bold mx-auto ">Name Your Place</h1>

      <Input
        placeholder="Name Your Place"
        className="text-base h-[10dvh] w-2/3"
        id="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        onSubmit={(e) => e.preventDefault()}
      />
      <Button
        className="ml-auto text-base font-semibold"
        onClick={() => {
          setFormIndex(1);
          dispatch(setNewLodging({ ...new_lodging, name }));
        }}
        disabled={!name}
      >
        Next <ChevronRightIcon className="h-5 ml-2 w-auto" />
      </Button>
    </motion.div>
  );
}
