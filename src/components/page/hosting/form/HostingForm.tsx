import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import HostingPlaceName from "./HostingPlaceName";
import HostingAddress from "./HostingAddress";
import HostingPhotos from "./HostingPhotos";

export default function HostingForm() {
  const [form_index, setFormIndex] = useState(0);

  return (
    <form className="w-[90%] h-[90%]">
      <AnimatePresence>
        {form_index === 0 && <HostingPlaceName setFormIndex={setFormIndex} />}
        {form_index === 1 && <HostingAddress setFormIndex={setFormIndex} />}
        {form_index === 2 && <HostingPhotos setFormIndex={setFormIndex} />}
      </AnimatePresence>
    </form>
  );
}
