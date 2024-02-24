import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PreferenceSearchType } from "../Preference";
import { cn } from "@/lib/utils";
import ProvinceMenu from "./ProvinceMenu";
import MunicipalityCityMenu from "./MunicipalityCityMenu";
import BarangayMenu from "./BarangayMenu";
import { motion } from "framer-motion";

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
      className={cn("h-full flex items-center justify-center space-x-5")}
    >
      <p
        onClick={() => setView((prev) => !prev)}
        className={cn(
          "text-muted-foreground text-base font-semibold cursor-pointer",
          view && "font-bold text-primary"
        )}
      >
        Location
      </p>

      {view && (
        <>
          <ProvinceMenu search={search} setSearch={setSearch} />
          <MunicipalityCityMenu search={search} setSearch={setSearch} />
          <BarangayMenu search={search} setSearch={setSearch} />
        </>
      )}
    </motion.div>
  );
}
