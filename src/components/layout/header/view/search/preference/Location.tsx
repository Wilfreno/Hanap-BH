import { Dispatch, SetStateAction,  useState } from "react";
import { PreferenceSearchType } from "./Preference";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PhilippinesPlacesMenu from "@/components/reusables/PhilippinesPlacesMenu";

export type PSGCResponseType = {
  name: string;
  code: string;
};

export default function Location({
  setSearch,
  search,
}: {
  setSearch: Dispatch<SetStateAction<PreferenceSearchType>>;
  search: PreferenceSearchType;
}) {
  const [view, setView] = useState(false);

  return (
    <motion.div
      animate={view ? { width: "fit-content" } : { width: "100%" }}
      className="flex items-center space-x-5"
    >
      <Button
        type="button"
        variant="ghost"
        className={cn("text-base focus-visible:ring-0 rounded-full")}
        onClick={() => setView((prev) => !prev)}
      >
        Location
      </Button>

      {view && (
        <>
          <PhilippinesPlacesMenu
            selected={(selected) =>
              setSearch((prev) => ({ ...prev, selected }))
            }
          />
        </>
      )}
    </motion.div>
  );
}
